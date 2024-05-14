'use client'

import { Bookmark, Ellipsis, Forward, MessageSquareIcon, VerifiedIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PostInterface } from '@/@types'
import CardImages from './card-images'
import Likes from './reactions/likes'
import CommentBox from './reactions/comment'
import Link from 'next/link'
import Bookmarks from './reactions/bookmarks'

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
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentCount, setCommentCount] = useState<number>(comments)

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
                <h4 className='font-medium text-lg text-[#06090C]'>{fullName}</h4>
                {isVerified && <VerifiedIcon size={20} color='#40D89D' />}
                <span>@{username}</span>
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
            <div className='text-[#1c2022] flex items-center gap-8 pt-4'>
                <Likes likes={likes} postID={id} likedUsers={likedUsers} />
                <button className='reaction-btn' onClick={()=>setShowCommentBox(true)}>
                    <MessageSquareIcon className='hover:scale-110 transition-all' />
                    <span className={cn(commentCount === 0 ? "invisible" : "visible")}>{commentCount}</span>
                </button>
                <Bookmarks
                    postID={id}
                    bookmark_count={bookmarks}
                    bookmarkedUsers={bookmarkedUsers}
                />
                <Button variant={"outline"} className='border-[#4E6876] flex items-center gap-2 ml-auto'>
                    <Forward />
                    <span>Share</span>
                </Button>
            </div>
            <CommentBox 
                isShown={showCommentBox} 
                postID={id}
                setCommentCount={setCommentCount}
            />
        </div>
    )
}

export default Card