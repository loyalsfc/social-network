import Image from 'next/image'
import React from 'react'

function Card({profileImage, name}:{profileImage: string, name: string}) {
    return (
        <div>
            <div className='h-24 w-24 rounded-full border-2 border-primary mx-auto p-1.5 mb-1 bg-white text-center'>
                <div className='relative overflow-hidden h-full w-full rounded-full'>
                    <Image
                        src={profileImage}
                        fill
                        alt='Stories'
                        className='object-cover object-top'
                    />
                </div>
            </div>
            <p className='text-center text-sm font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis'>{name}</p>
        </div>
    )
}

export default Card