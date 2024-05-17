import { Ellipsis, VerifiedIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { cn } from '@/lib/utils'
import { PostInterface } from '@/@types'
import CardImages from './card-images'
import Link from 'next/link'
import ReactionsWrapper from './reactions/reactions-wrapper'
import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface Props {
    id: string;
    profilePicture: string;
    fullName: string;
    username: string;
    date: Date;
    caption: string;
    media?: PostInterface["media"];
    likes: number;
    comments: number;
    bookmarks: number;
    isVerified: boolean;
    likedUsers: string;
    bookmarkedUsers: string;
}

function Card({
    id,
    profilePicture,
    fullName,
    username,
    date,
    caption,
    media,
    likes,
    comments,
    bookmarks,
    isVerified,
    likedUsers,
    bookmarkedUsers,
}:Props) {


    return (
        <div className='block bg-white p-4'>
            <div className='flex items-center gap-2 text-[#263B42]'>
                <div className='h-[50px] w-[50px] rounded-full overflow-hidden relative'>
                    <Image
                        src={profilePicture}
                        fill
                        alt='Profile picture'
                        className='object-cover object-top'
                    />
                </div>
                <ProfileHoverCard
                    hoverText={fullName} 
                    textClassName='font-medium text-lg text-[#06090C]'
                    username={username} 
                />
                {isVerified && <VerifiedIcon size={20} color='#40D89D' />}
                <ProfileHoverCard 
                    textClassName='text-[#263B42]'
                    username={"@"+username} 
                />
                -
                <span>{timeAgo.format(date)}</span>
                <button className="ml-auto">
                    <Ellipsis />
                </button>
            </div>
            <Link 
                href={`/post/${id}`}
                className={cn(media?.length ? 'font-thin text-black mb-5 pl-[58px]' : "pt-4")}
            >
                {caption}
            </Link>
            {media && media?.length > 0 && <CardImages media={media}/>}
            <ReactionsWrapper
                id={id}
                likes={likes}
                comments={comments}
                bookmarks={bookmarks}
                likedUsers={likedUsers}
                bookmarkedUsers={bookmarkedUsers}
            />
        </div>
    )
}

export default Card