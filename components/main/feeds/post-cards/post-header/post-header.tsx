import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { Ellipsis, VerifiedIcon } from 'lucide-react'
import React from 'react'
import DropMenu from './drop-menu'
import { timeAgo } from '@/lib/utils'
import { PostInterface } from '@/@types'

interface Props{
    post:PostInterface
    avatarSize:number,
    showMenu:boolean
}

function PostHeader({
    post,
    avatarSize,
    showMenu
}:Props) {
    return (
        <div className='flex items-center gap-1.5 text-[#263B42]'>
            <ProfilePictureAvatar link={post.profile_picture} size={avatarSize} />
            <ProfileHoverCard
                hoverText={post.name} 
                textClassName='font-medium text-lg text-[#06090C]'
                username={post.username} 
            />
            {post.is_verified && <VerifiedIcon size={20} color='#40D89D' />}
            <ProfileHoverCard 
                textClassName='text-[#263B42]'
                username={"@"+post.username} 
            />
            -
            {post.created_at && <span>{timeAgo.format(new Date(post.created_at), "twitter")}</span>}
            {showMenu && <div className="drop-menu">
                <DropMenu post={post} />
            </div>}
        </div>
    )
}

export default PostHeader