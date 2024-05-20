'use client'

import PostCommentDelete from '@/components/post-view/modals/post-comment-delete';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/lib/hook';
import { Clock7, Code2Icon, Edit2Icon, Ellipsis, Flag, MessageSquare, PinIcon, Trash2, UserPlus2, UserRoundX } from 'lucide-react'
import React, { useState } from 'react'

function DropMenu({
    username,
    postId
}:{
    username:string;
    postId:string;
}) {
    const [showCommentDelete, setShowCommentDelete] = useState(false)

    const {user} =useAppSelector(state => state.user);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                {username === user?.username ? <DropdownMenuContent>
                    <DropdownMenuItem 
                        className='flex gap-2 items-center font-medium text-red-500'
                        onClick={()=>setShowCommentDelete(true)}
                    >
                        <Trash2 /> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <PinIcon /> Pin to profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <MessageSquare/> Who can comment on this post
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <Edit2Icon /> Edit post
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <Code2Icon /> Embed Post
                    </DropdownMenuItem>
                </DropdownMenuContent>:<DropdownMenuContent>
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <UserPlus2 /> Follow @{username}
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <UserRoundX /> Block @{username}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <Flag/> Report this post
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 items-center font-medium text-red-500'>
                        <Clock7 /> Snooze @{username} for 30 days
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                        <Code2Icon /> Embed Post
                    </DropdownMenuItem>
                </DropdownMenuContent>}
            </DropdownMenu>
            {showCommentDelete && <PostCommentDelete
                id={postId} 
                path='/post' 
                closeDelete={()=>setShowCommentDelete(false)}
            />}
        </>

    )
}

export default DropMenu