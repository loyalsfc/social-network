"use client"

import { CommentInterface } from '@/@types'
import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'
import CardImages from '@/components/main/feeds/post-cards/card-images'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { VerifiedIcon } from 'lucide-react'
import React, { createRef, useRef, useState } from 'react'
import CommentReactions from '../../comment-reaction/comment-like/comment-like'
import CommentPopBtn from '../../comment-reaction/comment-menu/comment-pop-btn'


function Card({
    comment,
    time
}:{
    comment: CommentInterface,
    time: string,
}) {
    const ref = createRef<HTMLDivElement>()
    const [isEditMode, setIsEditMode] = useState(false)
    return (
        <div className='flex gap-2 pb-4' ref={ref}>
            <ProfilePictureAvatar
                size={32}
                link={comment.profile_picture}
            />
            <div className='flex-1'>
                <div className='flex group-reply'>
                    <div className='w-fit'>
                        <div className=''>
                            <div className='py-2 px-3 rounded-2xl bg-grey-100/10 text-[15px] mb-2'>
                                <div className='flex items-center gap-1.5'>
                                    <ProfileHoverCard
                                        hoverText={comment.name} 
                                        textClassName='font-semibold text-[#06090C]'
                                        username={comment.username} 
                                    />
                                    {comment.is_verified && <VerifiedIcon size={20} color='#40D89D' />}
                                    <ProfileHoverCard 
                                        textClassName='text-[#263B42] text-sm font-medium'
                                        username={"@"+comment.username} 
                                    />
                                </div>
                                <p>{comment.comment_text}</p>
                            </div>
                            {comment.media.length > 0 && 
                                <div className=' max-w-52'>
                                    <CardImages media={comment.media} />
                                </div>
                            }
                        </div>
                        <CommentReactions
                            id={comment.id}
                            time={time}
                            likedUsers={comment.liked_users}
                            likesCount={comment.likes_count}
                            type="reply"
                        />
                    </div>
                    <div className='pt-4 pl-2 '>
                        <CommentPopBtn 
                            id={comment.id} 
                            username={comment.username} 
                            path='/reply'
                            itemRef={ref}
                            setIsEditMode={setIsEditMode}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card