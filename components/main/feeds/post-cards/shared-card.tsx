import React from 'react'
import { cn } from '@/lib/utils'
import { PostInterface } from '@/@types'
import CardImages from './card-images'
import Link from 'next/link'
import ReactionsWrapper from '../reactions/reactions-wrapper'
import PostHeader from './post-header/post-header'
import { endpointGetRequests } from '@/app/action'

interface Props {
    post: PostInterface
}

async function SharedCard({
    post
}:Props) {
    const sharedPost:PostInterface = await endpointGetRequests(`/post/${post.shared_post_id}`)
    return (
        <div className='block bg-white p-4'>
            <PostHeader
                name={post.name}
                username={post.username}
                profilePicture={post.profile_picture}
                isVerified={post.is_verified}
                date={post.created_at}
                avatarSize={40}
                showMenu={true}
            />
            <Link 
                href={`/post/${post.id}`}
                className={cn("block pt-4",post.media?.length ? 'mb-4' : "")}
            >
                {post.content}
            </Link>
            <div className='p-2 mt-4 rounded-2xl border border-grey'>
                <PostHeader
                    name={sharedPost.name}
                    username={sharedPost.username}
                    profilePicture={sharedPost.profile_picture}
                    isVerified={sharedPost.is_verified}
                    date={sharedPost.created_at}
                    avatarSize={32}
                    showMenu={false}
                />
                <Link 
                    href={`/post/${sharedPost.id}`}
                    className={cn("block pt-2",sharedPost.media?.length ? 'mb-4' : "")}
                >
                    {sharedPost.content}
                </Link>
                {sharedPost.media && sharedPost.media?.length > 0 && <CardImages media={sharedPost.media}/>}
            </div>
            {post.media && post.media?.length > 0 && <CardImages media={post.media}/>}
            <ReactionsWrapper post={post}/>
        </div>
    )
}

export default SharedCard