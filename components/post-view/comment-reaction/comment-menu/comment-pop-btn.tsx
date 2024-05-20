'use client'

import React, { createRef, useState } from 'react'
import PostCommentDelete from '../../modals/post-comment-delete'
import DropMenu from './comment-menu'

function CommentPopBtn({
    username, 
    id
}:{
    username: string;
    id: string
}) {
    const [showCommentDelete, setShowCommentDelete] = useState(false)

    return (
        <>
            <div className="h-7 w-7 rounded-full grid place-content-center hover:bg-gray-600/20">
                <DropMenu
                    username={username} 
                    commentId={id} 
                    openDelete={()=>setShowCommentDelete(true)}
                />
            </div>
           {showCommentDelete && <PostCommentDelete
                id={id} 
                path='/comment' 
                closeDelete={()=>setShowCommentDelete(false)}
            />}
        </>
    )
}

export default CommentPopBtn