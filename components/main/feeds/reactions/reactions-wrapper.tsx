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
    post: PostInterface
}

function ReactionsWrapper({
    post
}:Props) {
    const {
        id,
        likes_count: likes,
        comments_count: comments,
        bookmarks_count: bookmarks,
        liked_users: likedUsers,
        bookmarked_users: bookmarkedUsers,
    } = post
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
                {/* <Button variant={"outline"} className='border-[#4E6876] flex items-center gap-2 ml-auto'>
                    <Forward />
                    <span>Share</span>
                </Button> */}
                <SharePost post={post} />
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