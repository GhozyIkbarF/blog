import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Undo2, Trash2, Pencil, MoreHorizontal } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ModalPost from '../modalpost'

const DetailedPost = () => {
  const router = useRouter()

  return (
    <section>
      <Card>
        <section className="flex flex-col">
          <div className="flex flex-row ml-6 mt-3 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button className="rounded-full" size="icon" variant="ghost" onClick={() => router.back()}>
                    <Undo2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Back to Previous Page</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h3 className="ml-3">Post</h3>
          </div>
          <CardHeader className="flex flex-row justify-between space-y-0 pb-6">
            <div className="flex flex-row">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/yandaagil.png" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="ml-3 text-lg">Yanda Agil</CardTitle>
                <CardDescription className="ml-3 [&:not(:first-child)]:mt-0">@yandaagil</CardDescription>
              </div>
            </div>
            <div>
              <ModalPost modalButton="Update" modalTitle="Edit Post">
                <Button className="rounded-full" size="icon" variant="ghost">
                  <Pencil />
                </Button>
              </ModalPost>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="ml-3 rounded-full" size="icon" variant="outline">
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
          </CardHeader>
          <article className="flex flex-col">
            <CardContent>
              <Badge className="mb-3">Fashion</Badge>
              <h2 className="mb-3">Lorem, ipsum dolor.</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus expedita praesentium pariatur mollitia illo est soluta tempora iusto quisquam eos! Numquam veniam atque necessitatibus animi non reprehenderit quia maxime, totam labore dolores modi omnis ab blanditiis cumque? Eveniet aut possimus sequi provident quod impedit magnam maiores pariatur sunt beatae, cum alias vitae eligendi eos animi atque nostrum vel cumque nam aperiam, perspiciatis et quis ratione eum! Culpa sint voluptas nostrum obcaecati, neque sunt cupiditate labore maiores, laudantium beatae debitis enim quia pariatur itaque veritatis optio, reprehenderit ipsa. Porro modi tenetur aliquid possimus debitis ex in officia ipsam ducimus natus beatae voluptatem iure velit magnam recusandae at corporis neque, deserunt fugiat vero atque! Tenetur quasi excepturi commodi officia qui beatae quae voluptatem reiciendis deserunt sequi. Soluta nisi iure quam officia quidem necessitatibus dolorem tenetur, vel suscipit mollitia minus quia, repellendus impedit ipsum deserunt tempora. Accusamus, molestiae. Molestias praesentium odio corporis tenetur itaque reiciendis aliquam quis adipisci, iure doloremque cumque rem repudiandae labore voluptas similique! Perferendis rem rerum quaerat architecto sint, iusto deserunt suscipit, fugit, eius tenetur voluptate porro iste officiis sed laboriosam molestias? Nemo, porro perferendis? Impedit delectus temporibus asperiores, blanditiis sit provident, possimus eos vitae quam similique quae cumque ut, maxime commodi incidunt? Dolore ullam tempore harum rem atque, iste expedita perferendis dolorum ad asperiores reiciendis fuga, aut voluptate, est perspiciatis eius aspernatur pariatur illo repellendus fugit omnis soluta voluptatem. Sed at nostrum labore nobis itaque praesentium magnam sunt cumque non, illo totam commodi saepe veniam veritatis culpa quod amet cupiditate pariatur sit nemo alias necessitatibus odit impedit? Laudantium laborum magnam asperiores minus, officiis eligendi animi dignissimos rerum voluptates, voluptate tenetur illum atque nesciunt explicabo fuga vel nihil ratione exercitationem nostrum, soluta vero minima! Vitae repellendus aliquam nostrum aliquid, beatae, cumque animi alias sed est, sit consequatur sapiente autem quos!</p>
            </CardContent>
          </article>
          <CardDescription className="m-0 px-6 pb-6 [&:not(:first-child)]:mt-0">6:49 PM · Sep 19, 2023</CardDescription>
        </section>
      </Card>
    </section>
  )
}

export default DetailedPost