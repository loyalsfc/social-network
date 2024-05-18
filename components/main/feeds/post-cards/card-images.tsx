import { PostInterface } from '@/@types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

function CardImages({
    media
}:{
    media: PostInterface["media"];
}) {
    return (
        <div className={cn('h-full overflow-hidden grid gap-1', media.length === 1 ? "grid-cols-1 aspect-[3/4]" : media.length === 2 ? "grid-cols-2 h-80" : "grid-cols-3 h-80")}>
           
            {media?.map((item, index)=>{
                if(index > 2) return;
                return(
                    <div 
                        className={cn('h-full grid group last:relative', media.length > 2 && " first:col-span-2 first:row-span-2")}
                        key={index}
                    >
                        {/* if the total length is more than 3, display the show more overlay on the last media */}
                        {media.length > 3 && 
                            <div 
                                className='z-10 hidden place-content-center group-last:grid absolute top-0 left-0 h-full w-full bg-black/30 hover:bg-black/50 transition-all cursor-pointer'
                            >
                                <span className='text-7xl font-medium text-white'>+{media.length - 3}</span>
                            </div>
                        }
                        {/* Check the media type to determine whether to display as image or video */}
                        {item.mediaType === "image" ? 
                            <div 
                                className={cn('relative h-full w-full')}
                            >
                                <Image
                                    src={item.url}
                                    fill
                                    alt='Post media'
                                    className='object-cover object-center'
                                />
                            </div> : <div className='bg-black'>
                                <video src={item.url} controls className='h-full w-full'>

                                </video>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default CardImages