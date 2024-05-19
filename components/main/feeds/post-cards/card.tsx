import React from 'react'
import { cn } from '@/lib/utils'
import { PostInterface } from '@/@types'
import CardImages from './card-images'
import Link from 'next/link'
import ReactionsWrapper from '../reactions/reactions-wrapper'
import PostHeader from './post-header/post-header'

interface Props {
    post: PostInterface
}

function Card({
    post
}:Props) {
    return (
        <div className='block bg-white p-4'>
            <PostHeader
                postId={post.id}
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
                className={cn('block pt-4', post.media?.length ? ' mb-4' : "")}
            >
                {post.content}
            </Link>
            {post.media && post.media?.length > 0 && <CardImages media={post.media}/>}
            <ReactionsWrapper fixedCommentBox={false} post={post}/>
        </div>
    )
}

export default Card