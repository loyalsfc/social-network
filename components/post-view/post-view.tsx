'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { CommentInterface, PostInterface } from '@/@types'
import CardImages from '../main/feeds/post-cards/card-images'
import ReactionsWrapper from '../main/feeds/reactions/reactions-wrapper'
import PostHeader from '../main/feeds/post-cards/post-header/post-header'
import { useAppSelector } from '@/lib/hook'
import Comments from './comments'

interface Props {
    post: PostInterface
    showMenu: boolean,
    comments: CommentInterface[],
}

function PostView({
    post,
    showMenu,
    comments,
}:Props) {
    const {
        id,
        created_at,
        content,
        media,
        is_verified,
        user_id
    } = post;
    const { blocks } = useAppSelector(state => state.block)
    const isUserBlocked = blocks.some(item => item === user_id);
    const [hidePost, setHidePost] = useState(isUserBlocked)

    return (
        <>
            {hidePost ? <div className='p-4 bg-gray-200'>
                This post is from a blocked account. Click here to <button className='text-primary hover:underline' onClick={()=>setHidePost(false)}> view post </button>
            </div> :
                <div>
                    <div className='block bg-white p-4'>
                        {/* <Back /> */}
                        <PostHeader
                        post={post}
                            avatarSize={50}
                            showMenu={showMenu}
                        />
                        <p 
                            className={cn(media?.length ? 'font-thin text-black mb-5 pl-[58px]' : "pt-4")}
                        >
                            {content}
                        </p>

                        {media && media?.length > 0 && <CardImages postId={id} media={media}/>}

                        <p className='font-medium text-sm py-4 flex gap-2 text-[#263B42]'>
                            <span>{new Date(created_at).toLocaleDateString("en-US", {month: "long", year: "numeric", day: "numeric"})}, </span>
                            <span>{new Date(created_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</span>
                        </p>

                        <ReactionsWrapper fixedCommentBox={true} post={post} className='border-y border-y-grey-500 py-1 gap-6'/>
                    </div>
                    <Comments comments={comments} className='px-4' />
                </div>
            }
        </>
    )
}

export default PostView