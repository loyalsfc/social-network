import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { Ellipsis, VerifiedIcon } from 'lucide-react'
import React from 'react'


TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface Props{
    name:string,
    username:string,
    profilePicture:string,
    isVerified:boolean,
    date:string,
    avatarSize:number,
    showMenu:boolean
}

function PostHeader({
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
            <span>{timeAgo.format(new Date(date), "twitter")}</span>
            {showMenu && <button className="ml-auto">
                <Ellipsis />
            </button>}
        </div>
    )
}

export default PostHeader