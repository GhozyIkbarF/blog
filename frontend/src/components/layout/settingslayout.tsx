import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type LayoutProps = {
  children: React.ReactNode,
};

const SettingsLayout = ({ children }: LayoutProps) => {
  return (
    <>
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
            <div className="flex flex-row w-full justify-between">
              <aside className="w-[25%]">
                <ul className="list-none">
                  <li>
                    <Link href="/profile/settings/profile">
                      <Button className="w-full justify-start" variant="outline">Profile</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/settings/password">
                      <Button className="w-full justify-start" variant="outline">Password</Button>
                    </Link>
                  </li>
                </ul>
              </aside>
              <section className="w-[75%] py-6 px-6">
                {children}
              </section>
            </div>
          </section>
        </Card>
      </section>
    </>
  )
}

export default SettingsLayout