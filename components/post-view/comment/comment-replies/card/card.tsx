"use client"

import { CommentInterface } from '@/@types'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import React, { createRef, useState } from 'react'
import ViewReply from './view-reply'
import { Edit3Icon } from 'lucide-react'
import EditComment from '../../card/edit-comment'


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
            {isEditMode ? 
            <div className='flex-1'>
                <EditComment
                    commentID={comment.id}
                    value={comment.comment_text}
                    defaultMedia={comment.media}
                    cancelEdit={()=>setIsEditMode(false)}
                    path='reply'
                />
            </div>:<ViewReply
                comment={comment}
                time={time}
                setIsEditMode={setIsEditMode}
            />}
        </div>
    )
}

export default Card