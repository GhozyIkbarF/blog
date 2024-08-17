import React from 'react'
import Title from '../head'
import { Skeleton } from '../ui/skeleton'
import { Card, CardHeader } from '../ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Undo2 } from 'lucide-react'
import router from 'next/router'
import Categories from '../section/categories'

const ProfileLoad = () => {
  return (
    <>
      <Title title="@wkwkwk Profile" />

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
              <h3 className="ml-3">Profile</h3>
            </div>
            <div className="flex justify-center">
              <CardHeader className="flex flex-row space-y-0 px-3 pt-3 pb-0 sm:px-6 sm:pt-6">
                <Skeleton className="w-28 h-28 rounded-full sm:w-32 sm:h-32" />
                <div className="ml-3 flex flex-col justify-between sm:ml-6">
                  <div className="flex flex-col">
                    <Skeleton className="h-7 w-32 sm:h-10 sm:w-40" />
                    <Skeleton className="mt-3 h-6 w-28 sm:h-7 sm:w-32" />
                  </div>
                </div>
              </CardHeader>
            </div>
            <Categories className="p-6 sm:justify-center" onClick={function (param: string): void {
              throw new Error('Function not implemented.')
            } } />
          </section>
        </Card>
      </section>
    </>
  )
}

export default ProfileLoad