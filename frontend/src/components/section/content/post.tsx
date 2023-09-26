import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

interface Post {
  author: {
    name: string,
    username: string;
    email: string,
    photo_profile: string
  };
  username: string;
  authorId: number;
  category: string;
  content: string;
  createdAt: string;
  id: number;
  image: string;
  published: boolean;
  title: string;
  updatedAt: string;
}

interface Repo {
  posts: Post[];
};

const Post = () => {

  const baseURL = process.env.NEXT_PUBLIC_API_CALL;

  const [data, setData] = useState<Repo | null>(null);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch(`${baseURL}/post`)
      .then((res) => res.json())
      .then((data: Repo) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (data?.posts.length === 0) return <p className="text-center" >No post data</p>;

  return (
    <Card>
      {data?.posts.map((post, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Avatar className="ml-6 mt-6">
                <AvatarImage src={post.author.photo_profile} />
                <AvatarFallback>{post.author.name.split('')[0].toLocaleUpperCase()}</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button className="ml-6 mt-3 rounded-full" size="icon" variant="outline" onClick={() => router.push(`/post/${post.id}`)}>
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>See detailed post</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-col">
              <CardHeader className="flex flex-row space-y-0 pb-3">
                <CardTitle className="text-sm">{post.author.username}</CardTitle>
                <CardDescription className="ml-2">{post.author.email}</CardDescription>
                <CardDescription className="ml-2">3 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                {post.category && <Badge className="mt-3">{post.category}</Badge>}
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
            </div>
          </div>
          {index !== data?.posts.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </Card >
  );
};

export default Post;

