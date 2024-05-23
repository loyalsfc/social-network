import { CommentInterface } from '@/@types'
import React from 'react'
import ProfilePictureAvatar from '../profile-picture-avatar/profile-picture-avatar'
import CardImages from '../main/feeds/post-cards/card-images'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { ProfileHoverCard } from '../hover-card/profile-hovercard'
import { VerifiedIcon } from 'lucide-react'
import CommentPopBtn from './comment-reaction/comment-menu/comment-pop-btn'
import  CommentReactions  from './comment-reaction/comment-like/comment-like'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo("en-US")

function Comments({
    comments
}:{
    comments: CommentInterface[]
}) {
    console.log(comments);
    return (
        <div className='bg-white px-4'>
            {comments.map(item => {
                console.log(item.likes_count)
                return(
                    <div className='flex gap-2 pb-4'>
                        <ProfilePictureAvatar 
                            size={32}
                            link={item.profile_picture}
                        />
                        <div className='flex group'>
                            <div className='w-fit'>
                                <div className='py-2 px-3 rounded-2xl bg-grey-100/10 text-[15px]'>
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
                                <CommentReactions 
                                    id={item.id}
                                    time={timeAgo.format(new Date(item.created_at), "mini-now")}
                                    likedUsers={item.liked_users}
                                    likesCount={item.likes_count}
                                />
                            </div>
                            <div className='pt-4 pl-2  group-hover:visible'>
                                <CommentPopBtn id={item.id} username={item.username} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments