import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from '@/components/ui/separator'

const Post = () => {
  return (
    <Card>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Avatar className="ml-6 mt-6">
            <AvatarImage src="https://github.com/yandaagil.png" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="ml-6 mt-3 rounded-full" size="icon" variant="outline"><Eye /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See detailed post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col">
          <CardHeader className="flex flex-row space-y-0 pb-3">
            <CardTitle className="text-sm">Yanda Agil</CardTitle>
            <CardDescription className="ml-2">@yandaagil</CardDescription>
            <CardDescription className="ml-2">3 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-3">Lorem, ipsum dolor.</CardTitle>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat nisi, excepturi doloribus exercitationem suscipit unde aut minus similique architecto animi reiciendis repellat voluptatem est, amet quae expedita tempora soluta cum vitae delectus? Odit officia architecto optio id ipsum aliquid recusandae repudiandae. Cumque, cum! Vel excepturi placeat incidunt odit. Non ipsa repellat culpa inventore possimus reiciendis porro architecto, commodi optio, ducimus quasi est veritatis perferendis libero provident nulla reprehenderit consequatur at saepe sapiente dolorum! Quas ducimus sed esse unde, cum facere. Laudantium tempora cupiditate explicabo laboriosam in iure, autem, minima et illo sint expedita neque assumenda harum. Similique, hic delectus.</p>
          </CardContent>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Avatar className="ml-6 mt-6">
            <AvatarImage src="https://github.com/ghozyikbarf.png" />
            <AvatarFallback>GI</AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="ml-6 mt-3 rounded-full" size="icon" variant="outline"><Eye /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See detailed post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col">
          <CardHeader className="flex flex-row space-y-0 pb-3">
            <CardTitle className="text-sm">Ghozy Ikbar</CardTitle>
            <CardDescription className="ml-2">@ghozyikbar</CardDescription>
            <CardDescription className="ml-2">5 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardTitle>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate vero tempore, recusandae assumenda facilis, quos sed ipsam laudantium iusto laborum non aliquid aliquam dolorum eaque, impedit neque veritatis harum hic. Repudiandae sit illum velit! Numquam, debitis reprehenderit! Animi harum quam quibusdam omnis, repudiandae voluptates eaque, illum magni dolore quidem molestiae mollitia hic qui temporibus. Error, enim? Libero, rem amet! Perferendis nesciunt blanditiis recusandae expedita repudiandae? Modi unde quibusdam odit voluptas suscipit labore veniam facilis repellendus natus libero dolorem fugit, dolorum temporibus ratione maiores exercitationem quos, dignissimos vel aspernatur saepe doloribus! Laboriosam, incidunt nesciunt consequatur labore laborum quos explicabo iusto!.</p>
          </CardContent>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Avatar className="ml-6 mt-6">
            <AvatarImage src="https://github.com/MuhammadAsharul.png" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="ml-6 mt-3 rounded-full" size="icon" variant="outline"><Eye /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See detailed post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col">
          <CardHeader className="flex flex-row space-y-0 pb-3">
            <CardTitle className="text-sm">Muhammad Asharul</CardTitle>
            <CardDescription className="ml-2">@muhammadasharul</CardDescription>
            <CardDescription className="ml-2">7 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-3">Lorem ipsum dolor sit amet consectetur.</CardTitle>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium odio quaerat eius vitae neque fugit provident? Impedit, ut voluptatibus quas ratione voluptate quae dolore consectetur sunt provident doloribus incidunt eveniet nihil libero quo labore voluptas perferendis dolores voluptatem, alias tenetur culpa, iusto ea? Quo beatae, esse fugit dolor non adipisci tempore perferendis. Molestiae eius, ab iste, odio velit quidem hic similique in repudiandae eveniet aperiam cupiditate quibusdam quo quod soluta temporibus iure libero et consequuntur? Quisquam deserunt ut et ipsum molestias praesentium ullam dignissimos. Delectus eum, assumenda recusandae quod rem, molestias perferendis unde amet hic quaerat aperiam, eligendi ipsa est!</p>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

export default Post