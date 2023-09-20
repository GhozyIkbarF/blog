import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

interface Post {
  author: { username: string; email: string}
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
  const [isLoading, setLoading] = useState<Boolean>(true);
  console.log(data);

  useEffect(() => {
    fetch(`${baseURL}/post`)
      .then((res) => res.json())
      .then((data: Repo) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center" >No post data</p>;

  return (
    <Card>
      {data.posts.map((post) => (
        <>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Avatar className="ml-6 mt-6">
                <AvatarImage src={post.image} />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="ml-6 mt-3 rounded-full"
                      size="icon"
                      variant="outline"
                    >
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>See detailed post</p>
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
                <CardTitle className="mb-3">{post.title}</CardTitle>
                <p>
                  {post.content}
                </p>
              </CardContent>
            </div>
          </div>
          <Separator />
        </>
      ))}
    </Card>
  );
};

export default Post;

