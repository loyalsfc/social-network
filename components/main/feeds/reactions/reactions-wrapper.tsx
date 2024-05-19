'use client'

import React, { useState } from 'react'
import CommentBox from './comment'
import { Button } from '@/components/ui/button'
import { Forward, MessageSquareIcon } from 'lucide-react'
import Bookmarks from './bookmarks'
import { cn } from '@/lib/utils'
import Likes from './likes'
import SharePost from './share'
import { PostInterface } from '@/@types'

interface Props{
    post: PostInterface;
    fixedCommentBox: boolean;
    className?: string
}

function ReactionsWrapper({
    post,
    fixedCommentBox,
    className
}:Props) {
    const {
        id,
        likes_count: likes,
        comments_count: comments,
        bookmarks_count: bookmarks,
        shared_count: shared,
        liked_users: likedUsers,
        bookmarked_users: bookmarkedUsers,
    } = post;
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentCount, setCommentCount] = useState<number>(comments);
    return (
        <>
            <div className={cn('text-[#1c2022] flex items-center gap-6 pt-4', className)}>
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
                <SharePost post={post} />
                <span className='text-left'>{shared > 0 ? shared : ""}</span>
            </div>
            <CommentBox
                fixedCommentBox={fixedCommentBox}
                isShown={showCommentBox || fixedCommentBox} 
                postID={id}
                setCommentCount={setCommentCount}
            />  
        </>
    )
}

export default ReactionsWrapper