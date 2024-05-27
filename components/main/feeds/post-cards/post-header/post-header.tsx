import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { Ellipsis, VerifiedIcon } from 'lucide-react'
import React from 'react'
import DropMenu from './drop-menu'
import { timeAgo } from '@/lib/utils'

interface Props{
    postId: string;
    name:string,
    username:string,
    profilePicture:string,
    isVerified:boolean,
    date?:string,
    avatarSize:number,
    showMenu:boolean
}

function PostHeader({
    postId,
    name,
    username,
    profilePicture,
    isVerified,
    date,
    avatarSize,
    showMenu
}:Props) {
    return (
        <div className='flex items-center gap-1.5 text-[#263B42]'>
            <ProfilePictureAvatar link={profilePicture} size={avatarSize} />
            <ProfileHoverCard
                hoverText={name} 
                textClassName='font-medium text-lg text-[#06090C]'
                username={username} 
            />
            {isVerified && <VerifiedIcon size={20} color='#40D89D' />}
            <ProfileHoverCard 
                textClassName='text-[#263B42]'
                username={"@"+username} 
            />
            -
            {date && <span>{timeAgo.format(new Date(date), "twitter")}</span>}
            {showMenu && <div className="ml-auto h-7 w-7 rounded-full grid place-content-center hover:bg-gray-600/20">
                <DropMenu username={username} postId={postId} />
            </div>}
        </div>
    )
}

export default PostHeader