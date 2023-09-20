"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Moon, Sun } from 'lucide-react'
import NewPost from './newpost'
import AvatarProfile from './avatarprofile'
import LoginBtn from './loginbtn'

const Navbar = () => {
  const { setTheme } = useTheme();
  const [data, setData] = useState<string>("")

  useEffect(() => {
    const item = localStorage.getItem('key')
    console.log(item);
  },[])
  
  return (
    <Card className="p-3">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {/* <LoginBtn /> */}
          <AvatarProfile />
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="outline" className="px-2" onClick={() => setTheme("light")}><Sun /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Change to light mode</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <NewPost />
        </div>
      </div>
    </Card>
  )
}

export default Navbar