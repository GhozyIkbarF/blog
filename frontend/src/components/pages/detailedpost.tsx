import React from 'react'
import Link from 'next/link'
import Navbar from '../section/navbar/navbar'
import Title from '../head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DetailedPost = () => {
  return (
    <>
      <Title title="Home / The Social" />

      <main className="min-h-screen w-4/6 py-5 mx-auto flex flex-col gap-2">
        <Navbar />
        <section>
          <Card>
            <section className="flex flex-col">
              <div className="flex flex-row ml-6 mt-3 items-center">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button className="rounded-full" size="icon" variant="ghost">
                        <Link href="/"><Undo2 /></Link>
                      </Button>
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
                  <AvatarImage src="https://github.com/yandaagil.png" />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle className="ml-3 text-lg">Yanda Agil</CardTitle>
                  <CardDescription className="ml-3 [&:not(:first-child)]:mt-0">@yandaagil</CardDescription>
                </div>
              </CardHeader>
              <article className="flex flex-col">
                <CardContent>
                  <CardTitle className="mb-3">Lorem, ipsum dolor.</CardTitle>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat nisi, excepturi doloribus exercitationem suscipit unde aut minus similique architecto animi reiciendis repellat voluptatem est, amet quae expedita tempora soluta cum vitae delectus? Odit officia architecto optio id ipsum aliquid recusandae repudiandae. Cumque, cum! Vel excepturi placeat incidunt odit. Non ipsa repellat culpa inventore possimus reiciendis porro architecto, commodi optio, ducimus quasi est veritatis perferendis libero provident nulla reprehenderit consequatur at saepe sapiente dolorum! Quas ducimus sed esse unde, cum facere. Laudantium tempora cupiditate explicabo laboriosam in iure, autem, minima et illo sint expedita neque assumenda harum. Similique, hic delectus.</p>
                </CardContent>
              </article>
              <CardDescription className="m-0 px-6 pb-6 [&:not(:first-child)]:mt-0">6:49 PM · Sep 19, 2023</CardDescription>
            </section>
          </Card>
        </section>
      </main>
    </>
  )
}

export default DetailedPost