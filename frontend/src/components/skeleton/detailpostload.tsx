import React from 'react'
import { Skeleton } from '../ui/skeleton'
import Title from '../head'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Undo2 } from 'lucide-react'
import router from 'next/router'

const DetailPostLoad = () => {
  return (
    <>
      <Title title="@wkwkw Post" />

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
              <h3 className="ml-3">Post</h3>
            </div>
            <CardHeader className="flex flex-row space-y-0 p-3 sm:p-6">
              <div className="flex flex-row">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col justify-between">
                  <Skeleton className="ml-3 h-7 w-24" />
                  <Skeleton className="ml-3 h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <article className="flex flex-col">
              <CardContent className="pt-3">
                <Skeleton className="mb-3 h-[22px] w-16 rounded-full px-2.5 py-0.5" />
                <Skeleton className="mb-3 h-8 w-56 sm:w-64 sm:h-9" />
                <div className="relative h-96">
                  <Skeleton className="h-full w-full" />
                </div>
                <Skeleton className="mt-3 w-full h-[60px] sm:h-[84px]" />
              </CardContent>
            </article>
            <footer className="m-0 px-3 pb-3 flex flex-row items-center sm:px-6 sm:pb-6">
              <Skeleton className="h-5 w-48" />
            </footer>
          </section>
        </Card>
      </section>
    </>
  )
}

export default DetailPostLoad