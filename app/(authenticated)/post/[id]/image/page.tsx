import { getComments, getPost } from '@/app/action'
import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'
import ImageCarousel from '@/components/image-slider/image-slider'
import DropMenu from '@/components/main/feeds/post-cards/post-header/drop-menu'
import ReactionsWrapper from '@/components/main/feeds/reactions/reactions-wrapper'
import Comments from '@/components/post-view/comments'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import React from 'react'

async function Page({params}:{
    params:{
        id: string,
        type: string,
        index: number
    }
}) {
    const postFunc = getPost(params.id)
    const commentsFunc = getComments(params.id)
    const [post, comments] = await Promise.all([postFunc, commentsFunc])

    return (
        <div className='fixed h-screen bg- w-full top-0 left-0 bg-black/70 z-50 flex'>
            <div className='flex-1'>
                <ImageCarousel
                    media={post.media}
                />
            </div>
            <div className='bg-white h-full max-w-sm w-full p-4'>
                <div className='flex gap-2 items-center'>
                    <ProfilePictureAvatar
                        size={40}
                        link={post.profile_picture}
                    />
                    <div className='flex flex-col justify-center'>
                        <ProfileHoverCard
                            hoverText={post.name} 
                            textClassName='font-medium text-lg text-[#06090C]'
                            username={post.username} 
                        />
                        <span className='text-[#263B42] leading-none'>@{post.username}</span>
                    </div>
                    <div className='drop-menu'>
                        <DropMenu post={post} />
                    </div>
                </div>
                <p className='py-3'>{post.content}</p>
                    <p className='font-medium text-sm py-4 flex gap-2 text-[#263B42]'>
                    <span>{new Date(post.created_at).toLocaleDateString("en-US", {month: "long", year: "numeric", day: "numeric"})}, </span>
                    <span>{new Date(post.created_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</span>
                </p>

                <ReactionsWrapper fixedCommentBox={true} post={post} className='border-y gap-4 border-y-grey-500 py-1'/>

                <Comments comments={comments} className='pt-5'/>
            </div>
        </div>
    )
}

export default Page