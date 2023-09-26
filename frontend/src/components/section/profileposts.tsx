import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Eye, Trash2, Pencil, MoreHorizontal, Globe, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ModalPost from '../modalpost'

interface posts {
  detail: string
  time: string
  title: string
  category?: string
  content: string
  public: boolean
}

const posts: posts[] = [
  {
    detail: "",
    time: "3 hours",
    title: "Lorem, ipsum dolor.",
    category: "Fashion",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat nisi, excepturi doloribus exercitationem suscipit unde aut minus similique architecto animi reiciendis repellat voluptatem est, amet quae expedita tempora soluta cum vitae delectus? Odit officia architecto optio id ipsum aliquid recusandae repudiandae. Cumque, cum! Vel excepturi placeat incidunt odit. Non ipsa repellat culpa inventore possimus reiciendis porro architecto, commodi optio, ducimus quasi est veritatis perferendis libero provident nulla reprehenderit consequatur at saepe sapiente dolorum! Quas ducimus sed esse unde, cum facere. Laudantium tempora cupiditate explicabo laboriosam in iure, autem, minima et illo sint expedita neque assumenda harum. Similique, hic delectus.",
    public: true
  },
  {
    detail: "",
    time: "5 hours",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, sunt? adipisicing elit",
    category: "Technology",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate vero tempore, recusandae assumenda facilis, quos sed ipsam laudantium iusto laborum non aliquid aliquam dolorum eaque, impedit neque veritatis harum hic. Repudiandae sit illum velit! Numquam, debitis reprehenderit! Animi harum quam quibusdam omnis, repudiandae voluptates eaque, illum magni dolore quidem molestiae mollitia hic qui temporibus. Error, enim? Libero, rem amet! Perferendis nesciunt blanditiis recusandae expedita repudiandae? Modi unde quibusdam odit voluptas suscipit labore veniam facilis repellendus natus libero dolorem fugit, dolorum temporibus ratione maiores exercitationem quos, dignissimos vel aspernatur saepe doloribus! Laboriosam, incidunt nesciunt consequatur labore laborum quos explicabo iusto!.",
    public: false
  },
  {
    detail: "",
    time: "7 hours",
    title: "Lorem ipsum dolor sit amet consectetur.",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium odio quaerat eius vitae neque fugit provident? Impedit, ut voluptatibus quas ratione voluptate quae dolore consectetur sunt provident doloribus incidunt eveniet nihil libero quo labore voluptas perferendis dolores voluptatem, alias tenetur culpa, iusto ea? Quo beatae, esse fugit dolor non adipisci tempore perferendis. Molestiae eius, ab iste, odio velit quidem hic similique in repudiandae eveniet aperiam cupiditate quibusdam quo quod soluta temporibus iure libero et consequuntur? Quisquam deserunt ut et ipsum molestias praesentium ullam dignissimos. Delectus eum, assumenda recusandae quod rem, molestias perferendis unde amet hic quaerat aperiam, eligendi ipsa est!",
    public: true
  }
]

const ProfilePosts = () => {
  const router = useRouter()

  return (
    <article className="flex flex-col">
      <h4 className="pb-3 text-center">{posts.length} Posts in all categories</h4>
      <Separator />
      {posts.map((post, index) => (
        <section key={index}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button className="ml-6 mt-6 rounded-full" size="icon" variant="outline" onClick={() => router.push('/post/12345')}>
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>See detailed post</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ModalPost modalButton="Update" modalTitle="Edit Post">
                <Button className="ml-6 mt-3 rounded-full" size="icon" variant="ghost">
                  <Pencil />
                </Button>
              </ModalPost>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="ml-6 mt-3 rounded-full" size="icon" variant="ghost">
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <article className="flex flex-col">
              <CardContent className="pt-6 pb-3">
                <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                {post.category && <Badge className="mt-3 cursor-default">{post.category}</Badge>}
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <footer className="m-0 px-6 pb-6 flex flex-row items-center">
                {post.public ?
                  <Globe className="w-[18px] h-[18px] mr-1 text-muted-foreground" />
                  : <Lock className="w-[18px] h-[18px] mr-1 text-muted-foreground" />
                }
                <CardDescription className="[&:not(:first-child)]:mt-0 before:content-['·']"> 6:49 PM · Sep 19, 2023</CardDescription>
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