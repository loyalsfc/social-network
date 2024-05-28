'use client'

import React, { Dispatch, RefObject, SetStateAction, useState } from 'react'
import DropMenu from './comment-menu'
import PostCommentDelete from '@/components/post-view/modals/post-comment-delete';

function CommentPopBtn({
    username, 
    id,
    path,
    itemRef,
    setIsEditMode
}:{
    username: string;
    id: string;
    path: string;
    itemRef?: RefObject<HTMLDivElement>;
    setIsEditMode: Dispatch<SetStateAction<boolean>>

}) {
    const [showCommentDelete, setShowCommentDelete] = useState(false)

    return (
        <>
            <div className="h-7 w-7 rounded-full grid place-content-center hover:bg-gray-600/20">
                <DropMenu
                    username={username} 
                    commentId={id} 
                    openDelete={()=>setShowCommentDelete(true)}
                    enableEdit={()=>setIsEditMode(true)}
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