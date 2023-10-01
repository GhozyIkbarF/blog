import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toaster } from '../ui/toaster'

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { isLogin } = useSelector((state: RootState) => state.utils);

  if (!isLogin) return <p className="text-center">You&apos;re not logged in</p>

  return (
    <>
      <section>
        <Card>
          <section className="flex flex-col">
            <div className="flex flex-row ml-3 mt-3 items-center sm:ml-6">
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
            <div className="flex flex-col w-full justify-between sm:flex-row">
              <aside className="w-full sm:w-[25%]">
                <ul className="flex flex-row list-none gap-2 m-6 sm:mr-0 sm:flex-col sm:gap-0">
                  <li className="w-1/2 sm:w-full">
                    <Button className="w-full justify-center sm:justify-start" variant="outline" onClick={() => router.push("/settings/avatar")}>Avatar</Button>
                  </li>
                  <li className="w-1/2 sm:w-full">
                    <Button className="w-full justify-center sm:justify-start" variant="outline" onClick={() => router.push("/settings/profile")}>Profile</Button>
                  </li>
                  <li className="w-1/2 sm:w-full">
                    <Button className="w-full justify-center sm:justify-start" variant="outline" onClick={() => router.push("/settings/password")}>Password</Button>
                  </li>
                </ul>
              </aside>
              <section className="w-full pb-6 px-6 sm:w-[75%] sm:py-6">
                {children}
              </section>
            </div>
          </section>
        </Card>
      </section>

      <Toaster />
    </>
  )
}

export default SettingsLayout