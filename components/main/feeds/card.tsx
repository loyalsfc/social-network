import { Bookmark, Ellipsis, Forward, Heart, MessageSquareIcon, VerifiedIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface Props {
    profilePicture: string;
    fullName: string;
    username: string;
    date: Date;
    caption: string;
    photo?:string;
    likes: number;
    comments: number;
    bookmarks: number;
    isVerified: boolean;
}

function Card({
    profilePicture,
    fullName,
    username,
    date,
    caption,
    photo,
    likes,
    comments,
    bookmarks,
    isVerified
}:Props) {
    return (
        <div className='bg-white p-4'>
            <div className='flex items-center gap-2 text-[#263B42]'>
                <div className='h-[50px] w-[50px] rounded-full overflow-hidden relative'>
                    <Image
                        src={profilePicture}
                        fill
                        alt='Profile picture'
                    />
                </div>
                <h4 className='font-medium text-lg text-[#06090C]'>{fullName}</h4>
                {isVerified && <VerifiedIcon size={20} color='#40D89D' />}
                <span>{username}</span>
                -
                <span>{timeAgo.format(date)}</span>
                <button className="ml-auto">
                    <Ellipsis />
                </button>
            </div>
            <p 
                className={cn(photo ? 'font-thin text-black mb-5 pl-[58px]' : "pt-4")}
            >
                {caption}
            </p>
            {photo && <div className='w-full aspect-[630/279] relative'>
                <Image
                    src={photo}
                    fill
                    alt='post image'
                    className='object-cover object-top'
                />
            </div>}
            <div className='text-[#4E6876] flex items-center gap-8 pt-4'>
                <button className='reaction-btn'>
                    <Heart />
                    <span>{likes}</span>
                </button>
                <button className='reaction-btn'>
                    <MessageSquareIcon />
                    <span>{comments}</span>
                </button>
                <button className='reaction-btn'>
                    <Bookmark />
                    <span>{bookmarks}</span>
                </button>
                <Button variant={"outline"} className='border-[#4E6876] flex items-center gap-2 ml-auto'>
                    <Forward />
                    <span>Share</span>
                </Button>
            </div>
        </div>
    )
}

export default Card