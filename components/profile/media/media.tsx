import { PostInterface } from '@/@types'
import Image from 'next/image'
import React from 'react'

function Media({
    post
}:{
    post: PostInterface[]
}) {

    const medias = () => {
        const mediasImages: string[] = [];
        let count = 0
        post.forEach(item => {
            if(item.media.length){
                item.media.forEach((media)=>{
                    if(count > 7) return;
                    if(media.mediaType === "image"){
                        mediasImages.push(media.url);
                        count++
                    }
                })
            }  
        })

        return mediasImages
    }

    return (
        <div>
            {medias().length ? <div className='grid grid-cols-2 gap-4'>
                {medias().map((item, index)=>{
                    return(
                        <div key={index} className='relative w-full aspect-[157/114]'>
                            <Image
                                src={item} 
                                fill 
                                alt='Media' 
                                className='rounded-md'
                            />
                        </div>
                    )
                })}
                </div> : <div className='text-center font-medium'>
                    No media found
            </div>}
        </div>
    )
}

export default Media