import React from 'react'
import { cn } from '@/lib/utils'
import { PostInterface } from '@/@types'
import CardImages from '../main/feeds/post-cards/card-images'
import ReactionsWrapper from '../main/feeds/reactions/reactions-wrapper'
import PostHeader from '../main/feeds/post-cards/post-header/post-header'

interface Props {
    post: PostInterface
}

function PostView({
    post
}:Props) {
    const {
    id,
    created_at,
    content,
    media,
    is_verified} = post;

    return (
        <div className='block bg-white p-4'>
            {/* <Back /> */}
            <PostHeader
               post={post}
                avatarSize={50}
                showMenu={true}
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
    )
}

export default PostView