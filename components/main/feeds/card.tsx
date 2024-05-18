import { Ellipsis, VerifiedIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { cn } from '@/lib/utils'
import { PostInterface } from '@/@types'
import CardImages from './card-images'
import Link from 'next/link'
import ReactionsWrapper from './reactions/reactions-wrapper'
import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface Props {
    post: PostInterface
}

function Card({
    post
}:Props) {
    const {
        id,
        profile_picture: profilePicture,
        name,
        username,
        created_at: date,
        content: caption,
        media,
        is_verified: isVerified,
    } = post

    return (
        <div className='block bg-white p-4'>
            <div className='flex items-center gap-2 text-[#263B42]'>
                <div className='h-[50px] w-[50px] rounded-full overflow-hidden relative'>
                    <Image
                        src={profilePicture}
                        fill
                        alt='Profile picture'
                        className='object-cover object-top'
                    />
                </div>
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
                <span>{timeAgo.format(new Date(date))}</span>
                <button className="ml-auto">
                    <Ellipsis />
                </button>
            </div>
            <Link 
                href={`/post/${id}`}
                className={cn(media?.length ? 'font-thin text-black mb-5 pl-[58px]' : "pt-4")}
            >
                {caption}
            </Link>
            {media && media?.length > 0 && <CardImages media={media}/>}
            <ReactionsWrapper post={post}/>
        </div>
    )
}

export default Card