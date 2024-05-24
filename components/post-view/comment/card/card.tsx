"use client"

import { CommentInterface } from '@/@types'
import { ProfileHoverCard } from '@/components/hover-card/profile-hovercard'
import CardImages from '@/components/main/feeds/post-cards/card-images'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { VerifiedIcon } from 'lucide-react'
import React, { useState } from 'react'
import CommentReactions from '../comment-reaction/comment-like/comment-like'
import CommentPopBtn from '../comment-reaction/comment-menu/comment-pop-btn'
import CommentReply from '../comment-reaction/comment-reply/comment-reply'
import Replies from '../comment-replies/replies'

function Card({
    comment,
    time
}:{
    comment: CommentInterface,
    time: string,
}) {
    const [replyCount, setreplyCount] = useState<number>(comment.reply_count);
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    return (
        <div className='flex gap-2 pb-4'>
            <ProfilePictureAvatar
                size={32}
                link={comment.profile_picture}
            />
            <div className='flex-1'>
                <div className='flex group'>
                    <div className='w-fit'>
                        <div className='py-2 px-3 rounded-2xl bg-grey-100/10 text-[15px]'>
                            <div className='flex items-center gap-1.5'>
                                <ProfileHoverCard
                                    hoverText={comment.name} 
                                    textClassName='font-medium text-[#06090C]'
                                    username={comment.username} 
                                />
                                {comment.is_verified && <VerifiedIcon size={20} color='#40D89D' />}
                                <ProfileHoverCard 
                                    textClassName='text-[#263B42] text-sm'
                                    username={"@"+comment.username} 
                                />
                            </div>
                            <p>{comment.comment_text}</p>
                        </div>
                        {comment.media.length > 0 && <CardImages media={comment.media} />}
                        <CommentReactions
                            id={comment.id}
                            time={time}
                            likedUsers={comment.liked_users}
                            likesCount={comment.likes_count}
                            setShowReplyBox={setShowReplyBox}
                        />
                        {replyCount > 0 && <div className=''>
                           {!showReplies ?
                            <button 
                                className='text-sm font-semibold text-grey-100 hover:underline'
                                onClick={()=>setShowReplies(true)}
                            >
                                View {replyCount === 1 ?"1 reply" : `all ${replyCount} replies`}
                            </button> : <Replies commentId='' />
                            }
                        </div>}
                    </div>
                    <div className='pt-4 pl-2  group-hover:visible'>
                        <CommentPopBtn id={comment.id} username={comment.username} />
                    </div>
                </div>
                {showReplyBox && <CommentReply
                    isShown={true}
                    commentID={comment.id}
                    setreplyCount={setreplyCount}
                />}
            </div>
        </div>
    )
}

export default Card