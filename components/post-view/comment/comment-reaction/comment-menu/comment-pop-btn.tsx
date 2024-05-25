'use client'

import React, { RefObject, useState } from 'react'
import DropMenu from './comment-menu'
import PostCommentDelete from '@/components/post-view/modals/post-comment-delete';

function CommentPopBtn({
    username, 
    id,
    path,
    itemRef
}:{
    username: string;
    id: string;
    path: string;
    itemRef?: RefObject<HTMLDivElement>
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
                path={path}
                closeDelete={()=>setShowCommentDelete(false)}
                itemRef={itemRef}
            />}
        </>
    )
}

export default CommentPopBtn