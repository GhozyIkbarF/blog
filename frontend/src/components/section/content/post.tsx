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

const Post = () => {
  const socket = io('http://localhost/8080')
  socket.emit('post', 'new post')
  socket.on("post", (data) => {
    dispatch(setPosts(data));
  });
  
  
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  
  const [isLoading, setLoading] = useState<Boolean>(true);
  const { posts } = useSelector((state:RootState) => state.utils);
  
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
      
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!posts) return <p className="text-center" >No post data</p>;

  return (
    <Card>
      {posts?.map((post: any, index: any) => (
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
                      <Eye/>
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
                <CardDescription className="ml-2">{timePosted(post.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                {post.category ? <Badge className="mt-3">{post.category}</Badge> : null}
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
            </div>
          </div>
          {index !== posts?.length -1 && <Separator />}
        </React.Fragment>
      ))}
    </Card>
  );
};

export default Post;

