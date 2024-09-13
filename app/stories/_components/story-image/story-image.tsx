"use client"

import { cn } from '@/lib/utils';
import * as TheImage from 'next/image'
import React, { useEffect, useState } from 'react'

function StoryImage({imageLink}:{imageLink: string;}) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(()=>{
        imageDimension()
    }, [])

    const imageDimension = () => {
        const image = new Image();
        image.src = imageLink;

        image.onload = () => {
            setDimensions({width: image.width,height: image.height})
        }
    }
    
  return (
    <>
        <div 
            className={cn("h-full w-full absolute top-0 left-0 bg-cover bg-center blur")} 
            style={{backgroundImage: `url("${imageLink}")`}} 
        />
        <div className='relative w-full h-auto'>
            <TheImage.default
                src={imageLink}
                height={dimensions.height}
                width={dimensions.width}
                objectFit={"contain"}
                objectPosition='center'
                alt='Story image'
                className='z-20'
            />
        </div>
    </>
  )
}

export default StoryImage