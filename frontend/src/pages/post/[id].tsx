import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/section/navbar/navbar";
import Title from "@/components/head";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Undo2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_CALL;

interface DetailedPost {
  author: {
    name: string;
    username: string;
    email: string;
    photo_profile: string;
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

const DetailedPost = () => {
  const [detailPost, setDetailPost] = useState<DetailedPost>();
  const router = useRouter();
  const id: number | undefined = parseInt(router.query.id as string);
  
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;

  const getDetailPost = async (id: number) => {
    try {
      const res = await axios.get(`${baseURL}/post/${id}`);
      setDetailPost(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
      return router.push("/404")
    }
  };

  useEffect(() => {
    if (!id) return;
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const paramId = urlParams.get('id');
    getDetailPost(id);
  }, [id]);

  return (
    <section>
      <Card>
        <section className="flex flex-col">
          <div className="flex flex-row ml-6 mt-3 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link href="/" className="cursor-pointer">
                        <Button className="rounded-full" size="icon" variant="ghost">
                          <Undo2 />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Back to Home</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h3 className="ml-3">Post</h3>
          </div>
          <CardHeader className="flex flex-row space-y-0 pb-6">
            <Avatar className="w-12 h-12">
              <AvatarImage src={detailPost?.author.photo_profile} />
              <AvatarFallback>
                {detailPost?.author.name.split("")[0].toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="ml-3 text-lg">
                {detailPost?.author.username}
              </CardTitle>
              <CardDescription className="ml-3 [&:not(:first-child)]:mt-0">
                {detailPost?.author.email}
              </CardDescription>
            </div>
          </CardHeader>
          <article className="flex flex-col">
            <CardContent>
              <Badge className="mb-3">{detailPost?.category}</Badge>
              <h2 className="mb-3">{detailPost?.title}</h2>
              <p>{detailPost?.content}</p>
            </CardContent>
          </article>
          <CardDescription className="m-0 px-6 pb-6 [&:not(:first-child)]:mt-0">
            6:49 PM · Sep 19, 2023
          </CardDescription>
        </section>
      </Card>
    </section>
  );
};

export default DetailedPost;
