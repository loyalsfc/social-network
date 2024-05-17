'use client'

import React, { useState } from 'react'
import CommentBox from './comment'
import { Button } from '@/components/ui/button'
import { Forward, MessageSquareIcon } from 'lucide-react'
import Bookmarks from './bookmarks'
import { cn } from '@/lib/utils'
import Likes from './likes'

interface Props{
    id: string;
    likes: number;
    comments: number;
    bookmarks: number;
    likedUsers: string;
    bookmarkedUsers: string;
}

function ReactionsWrapper({
    id,
    likes,
    comments,
    bookmarks,
    likedUsers,
    bookmarkedUsers,
}:Props) {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentCount, setCommentCount] = useState<number>(comments)
    return (
        <>
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
        </>
    )
}

export default ReactionsWrapper