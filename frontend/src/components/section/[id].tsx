import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Eye, Trash2, Pencil, MoreHorizontal, Globe, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import NewPost from '../newpost'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPosts } from "@/Utlis";
import { RootState } from "@/store";
import { createdAt } from "@/Utlis/date";
import EditPost from '../editpost'
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"

const ProfilePosts = () => {
  const router = useRouter()
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const id: number | undefined = parseInt(router.query.id as string);
  const myItemRef = useRef<HTMLButtonElement | null>(null);

  // const [profilePosts, setProfilePosts] = useState([])
  const [isLoading, setLoading] = useState<Boolean>(true);
  const { posts, userData, accessToken } = useSelector((state: RootState) => state.utils);

  const { toast } = useToast();

  const dispatch = useDispatch();
  const headers = {
    'authorization': `Bearer ${accessToken}`,
  }

  const getProfilePosts = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseURL}/profileposts/${id}`, {headers});
      dispatch(setPosts(res.data))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!id) return
    getProfilePosts()
  }, [id])

  const deletePost = async (id: number, index: number) => {
    const listPost = [...posts]

    try {
      await axios.delete(`${baseURL}/post/delete/${id}`);
      listPost.splice(index, 1)
      dispatch(setPosts(listPost))
      if (myItemRef.current) myItemRef.current.click();
      toast({
        title: "Post has been deleted!",
        duration: 2500,
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Failed to delete post!",
        duration: 2500,
      })
    }
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <article className="flex flex-col">
      <h4 className="pb-3 text-center">
        {posts.length > 1
          ? `${posts.length} Posts in all categories`
          : `${posts.length} Post in all categories`}
      </h4>
      {posts.length > 0 && <Separator />}
      {posts?.map((post: any, index: number) => (
        <section key={index}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button className="ml-6 mt-6 rounded-full" size="icon" variant="outline" onClick={() => router.push(`/post/${post.id}`)}>
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>See detailed post</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {id === userData?.userId &&
                <>
                  <EditPost id={post.id} index={index} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="ml-6 mt-3 mb-6 rounded-full" size="icon" variant="ghost">
                        <Trash2 className="text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. After you click the post will be deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel ref={myItemRef}>Cancel</AlertDialogCancel>
                        <Button variant="destructive" onClick={() => deletePost(post.id, index)}>Delete</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              }
            </div>
            <article className="flex flex-col justify-between">
              <CardContent className="pt-6 pb-3">
                <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                {post.category && <Badge className="mt-3 cursor-default">{post.category.replace(/\b\w/g, l => l.toUpperCase())}</Badge>}
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <footer className="m-0 px-6 pb-6 flex flex-row items-center">
                {post.published ?
                  <Globe className="w-[18px] h-[18px] mr-1 text-muted-foreground" />
                  : <Lock className="w-[18px] h-[18px] mr-1 text-muted-foreground" />
                }
                <CardDescription className="[&:not(:first-child)]:mt-0">{createdAt(post.createdAt)}</CardDescription>
              </footer>
            </article>
          </div>
          {index !== posts.length - 1 && <Separator />}
        </section>
      ))}
    </article>
  )
}

export default ProfilePosts