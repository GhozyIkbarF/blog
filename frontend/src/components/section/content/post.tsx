import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface Posts {
  avatar: string
  initial: string
  detail: string
  name: string
  username: string
  time: string
  title: string
  category?: string
  content: string
}

const posts: Array<Posts> = [
  {
    avatar: "https://github.com/yandaagil.png",
    initial: "YA",
    detail: "",
    name: "Yanda Agil",
    username: "@yandaagil",
    time: "3 hours",
    title: "Lorem, ipsum dolor.",
    category: "Fashion",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat nisi, excepturi doloribus exercitationem suscipit unde aut minus similique architecto animi reiciendis repellat voluptatem est, amet quae expedita tempora soluta cum vitae delectus? Odit officia architecto optio id ipsum aliquid recusandae repudiandae. Cumque, cum! Vel excepturi placeat incidunt odit. Non ipsa repellat culpa inventore possimus reiciendis porro architecto, commodi optio, ducimus quasi est veritatis perferendis libero provident nulla reprehenderit consequatur at saepe sapiente dolorum! Quas ducimus sed esse unde, cum facere. Laudantium tempora cupiditate explicabo laboriosam in iure, autem, minima et illo sint expedita neque assumenda harum. Similique, hic delectus."
  },
  {
    avatar: "https://github.com/ghozyikbarf.png",
    initial: "GI",
    detail: "",
    name: "Ghozy Ikbar",
    username: "@ghozyikbar",
    time: "5 hours",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Technology",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate vero tempore, recusandae assumenda facilis, quos sed ipsam laudantium iusto laborum non aliquid aliquam dolorum eaque, impedit neque veritatis harum hic. Repudiandae sit illum velit! Numquam, debitis reprehenderit! Animi harum quam quibusdam omnis, repudiandae voluptates eaque, illum magni dolore quidem molestiae mollitia hic qui temporibus. Error, enim? Libero, rem amet! Perferendis nesciunt blanditiis recusandae expedita repudiandae? Modi unde quibusdam odit voluptas suscipit labore veniam facilis repellendus natus libero dolorem fugit, dolorum temporibus ratione maiores exercitationem quos, dignissimos vel aspernatur saepe doloribus! Laboriosam, incidunt nesciunt consequatur labore laborum quos explicabo iusto!."
  },
  {
    avatar: "https://github.com/MuhammadAsharul.png",
    initial: "MA",
    detail: "",
    name: "Muhammad Asharul",
    username: "@muhammadasharul",
    time: "7 hours",
    title: "Lorem ipsum dolor sit amet consectetur.",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium odio quaerat eius vitae neque fugit provident? Impedit, ut voluptatibus quas ratione voluptate quae dolore consectetur sunt provident doloribus incidunt eveniet nihil libero quo labore voluptas perferendis dolores voluptatem, alias tenetur culpa, iusto ea? Quo beatae, esse fugit dolor non adipisci tempore perferendis. Molestiae eius, ab iste, odio velit quidem hic similique in repudiandae eveniet aperiam cupiditate quibusdam quo quod soluta temporibus iure libero et consequuntur? Quisquam deserunt ut et ipsum molestias praesentium ullam dignissimos. Delectus eum, assumenda recusandae quod rem, molestias perferendis unde amet hic quaerat aperiam, eligendi ipsa est!"
  }
]
const Post = () => {
  const router = useRouter()

  return (
    <Card>
      {posts.map((post, index) => (
        <section key={index}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Avatar className="ml-6 mt-6">
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{post.initial}</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button className="ml-6 mt-3 rounded-full" size="icon" variant="outline" onClick={() => router.push('/post/12345')}><Eye /></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>See detailed post</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <article className="flex flex-col">
              <CardHeader className="flex flex-row space-y-0 pb-3">
                <CardTitle className="text-sm">{post.name}</CardTitle>
                <CardDescription className="ml-2">{post.username}</CardDescription>
                <CardDescription className="ml-2">{post.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                {post.category ? <Badge className="mt-3">{post.category}</Badge> : null}
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
            </article>
          </div>
          {index !== posts.length - 1 ? (<Separator />) : null}
        </section>
      ))}
    </Card>
  )
}

export default Post