"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState, useCallback, useEffect } from 'react'
import StoryImage from '../_components/story-image/story-image'
import { Input } from '@/components/ui/input'
import { Heart, Pause, Send, Verified, VolumeX } from 'lucide-react'
import Avatar from '@/components/avatar/avatar'
import Link from 'next/link'

const storymedias = [
    "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/17332275/pexels-photo-17332275/free-photo-of-green-park-scenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
]

function Page() {
    const [activeStory, setActiveStory] = useState(0);
    const [viewDuration, setViewDuration] = useState(0);

    useEffect(()=>{
        const intervalId = setInterval(()=> {
            setActiveStory(prevState => {
                if(prevState < (storymedias.length - 1)){
                    return prevState + 1
                } else {
                    return prevState
                }
            })
        },5000)

        return(()=>clearInterval(intervalId));
    },[])

    useEffect(()=>{
        const timeoutId = setInterval(()=> {
            setViewDuration(prevState => {
                if(prevState < 100){
                    return prevState + 0.002
                } else {
                    return prevState
                }
            })
        },1)

        return()=>clearInterval(timeoutId)
    },[activeStory])

    const imageLink = storymedias[activeStory];

    const updatePercentage = useCallback(
      () => {
        
      },
      [activeStory],
    )
    

  return (
    <div className='h-full w-full py-4'>
        <div className='aspect-[284/505] h-full rounded-md relative bg-grey-100/10 overflow-hidden mx-auto flex items-center'>
            <div className={cn("absolute top-4 left-0 z-30 grid  w-full px-4",)}>
                <ul className='grid gap-0.5' style={{gridTemplateColumns: `repeat(${storymedias.length}, minmax(0, 1fr)`}}>
                    {
                        Array.from({length: storymedias.length}).map((_, index) => {
                            return (
                                <li key={index} className={cn("h-1 w-full overflow-hidden rounded-full bg-[#d8d9da]")}>
                                    <div 
                                        className='h-full bg-white transition-all' 
                                        style={{width: `${activeStory >  index ? 100 : activeStory === index ? viewDuration : 0}px` }}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>

                <div className='flex items-center gap-1 py-2'>
                    <Avatar imageLink={imageLink} size='40' />
                    <h4 className='text-white flex items-center gap-1 font-medium'>
                        <Link href={"/loyalsfc"} className='hover:underline'>
                            @loyalsfc 
                        </Link>
                        <Verified size={16} color='#40D89D' />
                    </h4>

                    <div className='flex text-white gap-1 ml-auto'>
                        <button className='hover:scale-125 transition-all'>
                            <VolumeX size={20} />
                        </button>
                        <button className='hover:scale-125 transition-all'>
                            <Pause size={20} />
                        </button>
                    </div>
                </div>
            </div>
           <StoryImage imageLink={imageLink} />
           <div className='h-14 w-full absolute bottom-0 flex items-center gap-3 bg-transparent px-4'>
                <Input className='rounded-full border-white bg-transparent placeholder:text-white flex-1 placeholder text-white focus-visible:ring-transparent' placeholder='reply this story' />
                <Heart color='#FFF' />
                <button><Send color='#FFF' /></button>
            </div>
        </div>
    </div>
  )
}

export default Page