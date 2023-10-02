import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'

const ProfilePostLoad = () => {
  return (
    <article className="flex flex-col">
      <h4 className="pb-3 text-center">
        Loading post/s...
      </h4>
      <Separator />
      <section>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6 sm:mt-6" />
            {/* <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6" />
            <Skeleton className="ml-3 mt-3 mb-3 h-10 w-10 rounded-full sm:ml-6 sm:mb-6" /> */}
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="px-3 py-3 sm:py-6 sm:px-6">
              <Skeleton className="h-[18px] w-40 sm:w-[250px]" />
              <Skeleton className="mt-3 h-[22px] w-16 rounded-full px-2.5 py-0.5" />
              <Skeleton className="mt-3 w-full h-[60px] sm:h-[84px]" />
            </div>
            <div className="m-0 px-3 pb-3 sm:px-6 sm:pb-6">
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row">
          <div className="flex flex-col">
            <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6 sm:mt-6" />
            {/* <Skeleton className="ml-3 mt-3 h-10 w-10 rounded-full sm:ml-6" />
            <Skeleton className="ml-3 mt-3 mb-3 h-10 w-10 rounded-full sm:ml-6 sm:mb-6" /> */}
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="px-3 py-3 sm:py-6 sm:px-6">
              <Skeleton className="h-[18px] w-40 sm:w-[250px]" />
              <Skeleton className="mt-3 h-[22px] w-16 rounded-full px-2.5 py-0.5" />
              <Skeleton className="mt-3 w-full h-[60px] sm:h-[84px]" />
            </div>
            <div className="m-0 px-3 pb-3 sm:px-6 sm:pb-6">
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default ProfilePostLoad