"use client"

import { CommentInterface } from '@/@types'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import React, { useState } from 'react'
import ViewComment from './view-comment'
import EditComment from './edit-comment'

function Card({
    comment,
    time
}:{
    comment: CommentInterface,
    time: string,
}) {
    const [isEditMode, setIsEditMode] = useState(false)
    return (
        <div className='flex gap-2 pb-4'>
            <ProfilePictureAvatar
                size={32}
                link={comment.profile_picture}
            />
            {isEditMode ?<EditComment 
                commentID={comment.id} 
                value={comment.comment_text}
                defaultMedia={comment.media}
                cancelEdit={()=>setIsEditMode(false)}
            />:<ViewComment
                comment={comment}
                time={time}
                setIsEditMode={setIsEditMode}
            />}
        </div>
    )
}

export default Card