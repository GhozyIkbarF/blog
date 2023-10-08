import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Eye, Trash2, Globe, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPosts } from "@/Utlis";
import { RootState } from "@/store";
import { createdAt } from "@/Utlis/date";
import EditPost from '../../editpost'
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import ProfilePostLoad from '@/components/skeleton/profilepostload'

const ProfilePosts = ({ categoryLabel }: { categoryLabel: string }) => {
  const router = useRouter()
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const id: number | undefined = parseInt(router.query.id as string);
  const myItemRef = useRef<HTMLButtonElement | null>(null);

  // const [profilePosts, setProfilePosts] = useState([])
  const [isLoading, setLoading] = useState(true);
  const { posts, userData, accessToken } = useSelector((state: RootState) => state.utils);

  const { toast } = useToast();

  const dispatch = useDispatch();
  const headers = {
    'authorization': `Bearer ${accessToken}`,
  }

  const getProfilePosts = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseURL}/profileposts/${id}`, { headers });
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
      toast({
        title: "Failed to delete post!",
        duration: 2500,
      })
    }
  }

  if (isLoading) return <ProfilePostLoad />;

  return (
    <article className="flex flex-col">
      <h4 className="pb-3 text-center">
        {`${posts.length} ${posts.length > 1 ? `Posts` : `Post`} in ${categoryLabel === "" ? "all categories" : categoryLabel.replace(/\b\w/g, l => l.toUpperCase())}`}
      </h4>
      {posts.length > 0 && <Separator />}
      {posts?.map((post: any, index: number) => (
        <section key={index}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button className="ml-3 mt-3 rounded-full sm:ml-6 sm:mt-6" size="icon" variant="outline" onClick={() => router.push(`/post/${post.id}`)}>
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
                      <Button className="ml-3 mt-3 mb-3 rounded-full sm:ml-6 sm:mb-6" size="icon" variant="ghost">
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
                        <Button variant="destructive" className="w-1/2 sm:w-auto" onClick={() => deletePost(post.id, index)}>Delete</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              }
            </div>
            <article className="flex flex-col justify-between">
              <CardContent className="pt-3 pb-3 sm:pt-6">
                <CardTitle className="line-clamp-1 hover:underline cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>{post.title}</CardTitle>
                {post.category && <Badge className="mt-3 cursor-default">{(post.category as string).replace(/\b\w/g, l => l.toUpperCase())}</Badge>}
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <footer className="m-0 px-3 pb-3 flex flex-row items-center sm:px-6 sm:pb-6">
                {post.published
                  ? <Globe className="w-[18px] h-[18px] mr-1 text-muted-foreground" />
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