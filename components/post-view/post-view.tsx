'use client'

import { Bookmark, Ellipsis, Forward, MessageSquareIcon, VerifiedIcon } from 'lucide-react'
import React, { createRef, useState } from 'react'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CommentInterface, Media, PostInterface } from '@/@types'
// import CardImages from './card-images'
// import Likes from './reactions/likes'
// import CommentBox from './reactions/comment'
import Link from 'next/link'
import ProfilePictureAvatar from '../profile-picture-avatar/profile-picture-avatar'
import CardImages from '../main/feeds/card-images'
import Likes from '../main/feeds/reactions/likes'
import { useAppSelector } from '@/lib/hook'
import CommentBox from '../main/feeds/reactions/comment'

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
    commentsCount: number;
    bookmarks: number;
    isVerified: boolean;
    likedUsers: string;
    comments: CommentInterface[]
}

function PostView({
    id,
    profilePicture,
    fullName,
    username,
    date,
    caption,
    media,
    likes,
    commentsCount,
    bookmarks,
    isVerified,
    likedUsers,
    comments
}:Props) {
    const [commentCount, setCommentCount] = useState<number>(commentsCount)
    // const {user} = useAppSelector(state => state.user)

    return (
        <div className='block bg-white p-4'>
            <div className='flex items-center gap-2 text-[#263B42]'>
                <ProfilePictureAvatar size={50} link={profilePicture} />
                <h4 className='font-medium text-lg text-[#06090C]'>{fullName}</h4>
                {isVerified && <VerifiedIcon size={20} color='#40D89D' />}
                <span>@{username}</span>
                <button className="ml-auto">
                    <Ellipsis />
                </button>
            </div>
            <p 
                className={cn(media?.length ? 'font-thin text-black mb-5 pl-[58px]' : "pt-4")}
            >
                {caption}
            </p>

            {media && media?.length > 0 && <CardImages media={media}/>}

            <p className='font-medium text-sm py-4 flex gap-2 text-[#263B42]'>
                <span>{date.toLocaleDateString("en-US", {month: "long", year: "numeric", day: "numeric"})}, </span>
                <span>{date.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</span>
            </p>

            <div className='text-[#1c2022] flex items-center gap-8 py-1 border-y border-y-grey-500'>
                <Likes likes={likes} postID={id} likedUsers={likedUsers} />
                <button className='reaction-btn'>
                    <MessageSquareIcon className='hover:scale-110 transition-all' />
                    <span className={cn(commentCount === 0 ? "invisible" : "visible")}>{commentCount}</span>
                </button>
                <button className='reaction-btn'>
                    <Bookmark  className='hover:scale-110 transition-all'/>
                    <span className={cn(bookmarks === 0 ? "invisible" : "visible")}>{bookmarks}</span>
                </button>
                <Button variant={"outline"} className='border-[#4E6876] flex items-center gap-2 ml-auto'>
                    <Forward />
                    <span>Share</span>
                </Button>
            </div>
            
            
            <CommentBox
                isShown={true}
                postID={id}
                setCommentCount={setCommentCount}
                className="flex-col-reverse gap-4"
            />
        </div>
    )
}

export default PostView