import { CommentInterface } from '@/@types'
import React from 'react'
import ProfilePictureAvatar from '../profile-picture-avatar/profile-picture-avatar'
import CardImages from '../main/feeds/card-images'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { HeartSolid } from '../main/feeds/reactions/likes'
import { ProfileHoverCard } from '../hover-card/profile-hovercard'
import { VerifiedIcon } from 'lucide-react'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo("en-US")

function Comments({
    comments
}:{
    comments: CommentInterface[]
}) {
    return (
        <div className='bg-white px-4'>
            {comments.map(item => {
                return(
                    <div className='flex gap-2 pb-4'>
                        <div></div>
                        <ProfilePictureAvatar 
                            size={32}
                            link={item.profile_picture}
                        />

                        <div className='w-fit'>
                            <div className='py-2 px-3 rounded-3xl bg-grey-100/10 text-[15px]'>
                                <div className='flex items-center gap-1.5'>
                                    <ProfileHoverCard
                                        hoverText={item.name} 
                                        textClassName='font-medium text-[#06090C]'
                                        username={item.username} 
                                    />
                                    {item.is_verified && <VerifiedIcon size={20} color='#40D89D' />}
                                    <ProfileHoverCard 
                                        textClassName='text-[#263B42] text-sm'
                                        username={"@"+item.username} 
                                    />
                                </div>
                                <p>{item.comment_text}</p>
                            </div>
                            {item.media.length > 0 && <CardImages media={item.media} />}
                            <div className='flex gap-2 text-grey-500 items-center'>
                                <span className='text-xs'>{timeAgo.format(new Date(item.created_at), "mini-now")}</span>
                                <button className='text-sm font-medium hover:scale-105 transition-all'>Like</button>
                                <button className='text-sm font-medium hover:scale-105 transition-all'>Reply</button>
                                {item.likes_count !== 0 && <HeartSolid />}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments