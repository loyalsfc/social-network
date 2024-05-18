import { cn } from '@/lib/utils';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import Follow from '../profile/profile-picture/follow';
import ProfilePictureAvatar from '../profile-picture-avatar/profile-picture-avatar';
import Link from 'next/link';

interface Props {
    id: string;
    background: string;
    profileImage: string;
    name: string;
    username: string;
}

function Card({
    id,
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
            
            <div className='flex items-center justify-between mb-2'>
                <ProfilePictureAvatar link={profileImage} size={40}/>
                <Follow userToFollowId={id} />    
            </div>
            <Link href={`/${username}`} className='text-lg font-semibold leading-none mb-1.5 block hover:underline'>{name}</Link>
            <p className=' font-thin leading-none'>@{username}</p>
        </li>
    )
}

export default Card