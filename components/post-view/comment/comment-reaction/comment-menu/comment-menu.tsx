'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/lib/hook';
import { Edit2Icon, Ellipsis, Flag, Trash2, UserPlus2, UserRoundX } from 'lucide-react'
import React from 'react'

function DropMenu({
    username,
    commentId,
    openDelete,
    enableEdit
}:{
    username:string;
    commentId:string;
    openDelete: ()=>void; 
    enableEdit: ()=>void;
}) {
    const {user} =useAppSelector(state => state.user);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
            {username === user?.username ? <DropdownMenuContent>
                <DropdownMenuItem 
                    className='flex gap-2 items-center font-medium text-red-500 focus:outline-none'
                    onClick={openDelete}
                >
                    <Trash2 /> Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className='flex gap-2 items-center font-medium'
                    onClick={enableEdit}
                >
                    <Edit2Icon /> Edit comment
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
                    <Flag/> Report this comment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>}
        </DropdownMenu>

    )
}

export default DropMenu