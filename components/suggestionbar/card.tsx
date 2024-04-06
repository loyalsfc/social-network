import { cn } from '@/lib/utils';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface Props {
    background: string;
    profileImage: string;
    name: string;
    username: string;
}

function Card({
    background,
    profileImage,
    name,
    username
}: Props) {
    return (
        <li    
            className={cn('w-[250px] text-white rounded-md relative py-3 px-5 z-10', `bg-cover bg-center bg-no-repeat transition-all hover:scale-105 cursor-pointer `)}
            style={{backgroundImage: `url('${background}')`}}
        >
            <div className="h-full w-full absolute top-0 left-0 bg-black/70 -z-10" />
            <button className='absolute right-2 top-4 text-white'>
                <EllipsisVertical size={14}/>
            </button>
            <div className='h-9 w-9 rounded-full overflow-hidden border-2 border-white relative mb-2'>
                <Image
                    src={profileImage}
                    fill
                    alt='Profile Image'
                    className='object-cover object-top'
                />
            </div>
            <h4 className='text-lg font-semibold leading-none mb-1.5'>{name}</h4>
            <p className=' font-thin leading-none'>@{username}</p>
        </li>
    )
}

export default Card