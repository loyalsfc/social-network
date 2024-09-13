"use client"

import { cn, timeAgo } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function StoryCard({
    profile_picture,
    username,
    newCount,
    time,
}:{
    profile_picture: string,
    username: string,
    newCount: number,
    time: string,
}) {

    const router = useRouter();
  return (
        <div onClick={()=>router.push(`/stories/${newCount}`)} className="flex items-center gap-1 py-2.5 px-2 rounded-lg cursor-pointer hover:bg-grey-100/10">
            <div className={cn("overflow-hidden h-14 w-14 border-2 rounded-full",newCount > 0 ? "border-primary" : "border-grey-100")}>
                <Image src={profile_picture} height={56} width={56} className='object-cover object-top' alt='Profile image'/>
            </div>
            <div>
                <h4 className='font-semibold leading-tight'>@{username}</h4>
                <p className='flex gap-2 text-sm'>
                    {newCount > 0 && <span className='text-primary font-medium'>{newCount} new</span> }
                    <span className='text-grey-100'>{timeAgo.format(new Date(time), "twitter-now")}</span>
                </p>
            </div>
        </div>
  )
}

export default StoryCard