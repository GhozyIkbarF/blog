import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/section/navbar/navbar'
import Title from '@/components/head'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Profile from '@/components/section/settings/profile'
import Password from '@/components/section/settings/password'

const Settings = () => {
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
                <h3 className="ml-3">Settings</h3>
              </div>
              <Tabs defaultValue="profile">
                <div className="flex flex-row w-full justify-between">
                  <aside className="w-[25%]">
                    <TabsList>
                      <ul className="list-none">
                        <li>
                          <TabsTrigger value="profile" className="w-full">
                            <Button className="w-full justify-start" variant="outline">Profile</Button>
                          </TabsTrigger>
                        </li>
                        <li>
                          <TabsTrigger value="password" className="w-full">
                            <Button className="w-full justify-start" variant="outline">Password</Button>
                          </TabsTrigger>
                        </li>
                      </ul>
                    </TabsList>
                  </aside>
                  <section className="w-[75%] py-6 px-6">
                    <Profile />
                    <Password />
                  </section>
                </div>
              </Tabs>
            </section>
          </Card>
        </section>
      </main>
    </>
  )
}

export default Settings