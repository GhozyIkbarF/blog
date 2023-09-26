import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <>
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
              <h3 className="ml-3">Settings</h3>
            </div>
            <div className="flex flex-row w-full justify-between">
              <aside className="w-[25%]">
                <ul className="list-none">
                  <li>
                    <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/profile/settings/profile")}>Profile</Button>
                  </li>
                  <li>
                    <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/profile/settings/password")}>Password</Button>
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