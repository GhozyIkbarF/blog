"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from "next-themes"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Moon, Sun, PenSquare } from 'lucide-react'
import ModalPost from '../../modalpost'
import AvatarProfile from './avatarprofile'
import LoginBtn from './loginbtn'

const Navbar = () => {
  const { setTheme } = useTheme()
  const router = useRouter()
  const [lightMode, setLightMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setLightMode(savedTheme);
    }
  }, []);

  const toggleLightMode = () => {
    const newTheme = lightMode === 'dark' ? 'light' : 'dark';
    setTheme(newTheme)
    setLightMode(newTheme);
  };

  return (
    <Card className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-self-start">
          {/* <LoginBtn /> */}
          <AvatarProfile />
        </div>
        <h3 className="absolute right-1/2 translate-x-1/2 cursor-pointer" onClick={() => router.push("/")}>The Social.</h3>
        <div className="flex gap-2 justify-self-end">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="px-2" onClick={toggleLightMode}>{lightMode === "dark" ? <Sun /> : <Moon />}</Button>
              </TooltipTrigger>
              <TooltipContent>
                {lightMode === "dark" ? <span>Change to light mode</span> : <span>Change to dark mode</span>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModalPost modalTitle="New Post" modalButton="Post">
            <Button className="font-bold">
              <PenSquare className="mr-2" /><span>New Post</span>
            </Button>
          </ModalPost>
        </div>
      </div>
    </Card>
  )
}

export default Navbar