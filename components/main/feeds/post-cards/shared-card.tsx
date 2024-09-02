"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { PostInterface } from '@/@types'
import CardImages from './card-images'
import Link from 'next/link'
import ReactionsWrapper from '../reactions/reactions-wrapper'
import PostHeader from './post-header/post-header'
import { endpointGetRequests } from '@/app/action'
import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '@/lib/hook'

interface Props {
    post: PostInterface
}

function SharedCard({
    post
}:Props) {
    const {user} = useAppSelector(state => state.user)
    const {data: sharedPost, isLoading, isError} = useQuery({
        queryKey: [post.shared_post_id],
        queryFn: ()=>endpointGetRequests(`/post/${post.shared_post_id}?userId=${user?.id}`),
    })
    const { blocks } = useAppSelector(state => state.block);
    
    const [hidePost, setHidePost] = useState(false);

    useEffect(()=>{
        const isUserBlocked = blocks.some(item => item === sharedPost?.user_id);
        setHidePost(isUserBlocked)
    },[isLoading])
    
    return (
        <div className='block bg-white p-4'>
            <PostHeader
                post={post}
                avatarSize={40}
                showMenu={true}
            />
            <Link 
                href={`/post/${post.id}`}
                className={cn("block pt-4",post.media?.length ? 'mb-4' : "")}
            >
                {post.content}
            </Link>
            <div className='mt-4 rounded-2xl border border-grey'>
                {isLoading ? 
                    <div className='h-5 p-2'>
                        <div className='mx-auto animate-spin h-5 w-5 rounded-full border-gray-800 border-t-white' /> 
                    </div> : <div>
                        {isError || sharedPost?.error ?
                            <div className='bg-gray-200 p-4 font-medium rounded-2xl'>
                                {sharedPost?.error?.error === "post restricted" ? "The Owner of this post has restricted who can view there post" : "The requested post is not available "}
                            </div> :
                            <>
                                {hidePost ? <div className='p-4 bg-gray-200 font-medium'>
                                    This post is from a blocked account. Click here to <button className='text-primary hover:underline' onClick={()=>setHidePost(false)}> view post </button>
                                </div>:
                                    <div className='p-2'>
                                        <PostHeader
                                            post={sharedPost}
                                            avatarSize={32}
                                            showMenu={false}
                                        />
                                        <Link 
                                            href={`/post/${sharedPost.id}`}
                                            className={cn("block pt-2",sharedPost.media?.length ? 'mb-4' : "")}
                                        >
                                            {sharedPost.content}
                                        </Link>
                                        {sharedPost.media && sharedPost.media?.length > 0 && <CardImages postId={sharedPost.id} media={sharedPost.media}/>}
                                    </div>
                                }
                            </>
                        }
                    </div>
                }
            </div>
            {post.media && post.media?.length > 0 && <CardImages media={post.media} postId={post.id}/>}
            <ReactionsWrapper fixedCommentBox={false} post={post}/>
        </div>
    )
}

export default SharedCard