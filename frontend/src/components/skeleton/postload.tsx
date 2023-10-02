import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'

const PostLoad = () => {
  return (
    <Card>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6 sm:mt-6" />
          <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6" />
        </div>
        <div className="flex flex-col w-full">
          <div className="p-3 flex flex-row space-y-0 pb-3 sm:pt-6 sm:px-6">
            <Skeleton className="h-5 w-[65px] sm:w-[65px]" />
            <Skeleton className="ml-2 h-5 w-[65px] sm:w-[65px]" />
            <Skeleton className="ml-2 h-5 w-[17px] sm:w-5" />
          </div>
          <div className="px-3 pb-3 sm:pt-0 sm:pb-6 sm:px-6">
            <Skeleton className="h-[18px] w-40 sm:w-[250px]" />
            <Skeleton className="mt-3 h-[22px] w-16 rounded-full px-2.5 py-0.5" />
            <Skeleton className="mt-3 w-full h-[60px] sm:h-[84px]" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6 sm:mt-6" />
          <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6" />
        </div>
        <div className="flex flex-col w-full">
          <div className="p-3 flex flex-row space-y-0 pb-3 sm:pt-6 sm:px-6">
            <Skeleton className="h-5 w-[65px] sm:w-[65px]" />
            <Skeleton className="ml-2 h-5 w-[65px] sm:w-[65px]" />
            <Skeleton className="ml-2 h-5 w-[17px] sm:w-5" />
          </div>
          <div className="px-3 pb-3 sm:pt-0 sm:pb-6 sm:px-6">
            <Skeleton className="h-[18px] w-40 sm:w-[250px]" />
            <Skeleton className="mt-3 h-[22px] w-16 rounded-full px-2.5 py-0.5" />
            <Skeleton className="mt-3 w-full h-[60px] sm:h-[84px]" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6 sm:mt-6" />
          <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6" />
        </div>
        <div className="flex flex-col w-full">
          <div className="p-3 flex flex-row space-y-0 pb-3 sm:pt-6 sm:px-6">
            <Skeleton className="h-5 w-[65px] sm:w-[65px]" />
            <Skeleton className="ml-2 h-5 w-[65px] sm:w-[65px]" />
            <Skeleton className="ml-2 h-5 w-[17px] sm:w-5" />
          </div>
          <div className="px-3 pb-3 sm:pt-0 sm:pb-6 sm:px-6">
            <Skeleton className="h-[18px] w-40 sm:w-[250px]" />
            <Skeleton className="mt-3 h-[22px] w-16 rounded-full px-2.5 py-0.5" />
            <Skeleton className="mt-3 w-full h-[60px] sm:h-[84px]" />
          </div>
        </div>
      </div>
    </Card >
  )
}

export default PostLoad