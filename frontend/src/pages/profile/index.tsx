import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Categories from '@/components/section/categories'
import ProfilePosts from '@/components/section/profileposts'
import Title from '@/components/head'

const Profile = () => {
  const router = useRouter()

  return (
    <>
      <Title title="Yanda" />

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
              <h3 className="ml-3">Profile</h3>
            </div>
            <div className="flex justify-center">
              <CardHeader className="flex flex-row space-y-0 pb-0">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="https://github.com/yandaagil.png" />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div className="ml-6 flex flex-col justify-between">
                  <CardTitle className="text-4xl line-clamp-1">Yanda Agil</CardTitle>
                  <CardDescription className="[&:not(:first-child)]:mt-0 text-lg">@yandaagil</CardDescription>
                  <div>
                    <Button variant="secondary" size="sm" onClick={() => router.push("profile/settings/profile")}>Edit profile</Button>
                  </div>
                </div>
              </CardHeader>
            </div>
            <Categories className="p-6 justify-center" />
            <ProfilePosts />
          </section>
        </Card>
      </section>
    </>
  )
}

export default Profile