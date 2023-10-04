"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from "next-themes"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Moon, Sun } from 'lucide-react'
import NewPost from './newpost'
import AvatarProfile from './avatarprofile'
import LoginBtn from './loginbtn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store'

const Navbar = () => {
  const { setTheme } = useTheme()
  const router = useRouter()
  const [lightMode, setLightMode] = useState<string>('light');

  const { isLogin } = useSelector((state: RootState) => state.utils);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setLightMode(savedTheme);
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
          {isLogin ? <AvatarProfile /> : <LoginBtn />}
        </div>
        <h3 className="absolute right-1/2 translate-x-1/2 cursor-pointer" onClick={() => router.push("/")}>The Social.</h3>
        <div className="flex gap-2 justify-self-end">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="px-2" onClick={toggleLightMode}>{lightMode === "dark" ? <Sun /> : <Moon />}</Button>
              </TooltipTrigger>
              <TooltipContent>
                {lightMode === "dark" ? "Change to light mode" : "Change to dark mode"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isLogin && <NewPost />}
        </div>
      </div>
    </Card>
  )
}

export default Navbar