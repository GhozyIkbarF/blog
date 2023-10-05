import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { timePosted } from "@/Utlis/date";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPosts } from "@/Utlis";
import { RootState } from "@/store";
import { io } from "socket.io-client";
import PostLoad from "@/components/skeleton/postload";

const Post = () => {

  // const socket = io('http://localhost/8080')
  // socket.emit('post', 'new post')
  // socket.on("post", (data) => {
  //   dispatch(setPosts(data));
  // });
  
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;

  const [isLoading, setLoading] = useState<Boolean>(true);
  const { posts } = useSelector((state: RootState) => state.utils);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${baseURL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setPosts(data));
        setLoading(false);
      });
  }, []);

  if (isLoading) return <PostLoad />;
  if (!posts) return <p className="text-center" >No post data</p>;

  return (
    <Card>
      {posts?.map((post: any, index: number) => (
        <React.Fragment key={index}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Avatar className="ml-3 mt-3 cursor-pointer sm:ml-6 sm:mt-6">
                <AvatarImage src={post.author.photo_profile} onClick={() => router.push(`/profile/${post.authorId}`)} />
                <AvatarFallback onClick={() => router.push(`/profile/${post.authorId}`)}>{post.author.name.split('')[0].toLocaleUpperCase()}</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button className="ml-3 mt-3 rounded-full sm:ml-6" size="icon" variant="outline" onClick={() => router.push(`/post/${post.id}`)}>
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
              <CardHeader className="p-3 flex flex-row space-y-0 pb-3 sm:px-6 sm:pt-6">
                <CardTitle className="text-sm hover:underline cursor-pointer" onClick={() => router.push(`/profile/${post.authorId}`)}>{post.author.name}</CardTitle>
                <CardDescription className="ml-2 hover:underline cursor-pointer" onClick={() => router.push(`/profile/${post.authorId}`)}>@{post.author.username}</CardDescription>
                <CardDescription className="ml-2 hover:underline cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>{timePosted(post.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 sm:pt-0 sm:pb-6">
                <CardTitle className="line-clamp-1 hover:underline cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>{post.title}</CardTitle>
                {post.category && <Badge className="mt-3 cursor-default">{(post.category as string).replace(/\b\w/g, l => l.toUpperCase())}</Badge>}
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
            </div>
          </div>
          {index !== posts?.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </Card >
  );
};

export default Post;

