'use client'

import { endpointPostRequests } from '@/app/action'
import { HeartSolid } from '@/components/main/feeds/reactions/likes';
import { useAppSelector } from '@/lib/hook';
import { cn } from '@/lib/utils';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
  
const CommentLike = ({
    id,
    likedUsers,
    setCount
}:{
    id: string;
    likedUsers: string[];
    setCount: Dispatch<SetStateAction<number>>;
}) => {
    const {user} = useAppSelector(state => state.user);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(()=>{
        if(user && likedUsers.includes(user?.username)){
            setIsLiked(true);
        }
    },[user])

    async function likeComment(){
        const path = isLiked ? "/unlike-comment" : "/like-comment"
        const response = await endpointPostRequests(`${path}/${id}`, {})
        
        if(response?.status === "success"){
            setIsLiked(prevState => !prevState);
            setCount(response.payload)
        }
    }

    return (
        <div>
            <button 
                className={cn('text-sm block font-medium hover:underline transition-all', isLiked ? "text-secondary": "")}
                onClick={likeComment}
            >
                {isLiked ? "Unlike" : "Like"}
            </button>
        </div>
    )
}

function CommentReactions({
    time,
    id,
    likedUsers,
    likesCount,
    setShowReplyBox
}:{
    time: string,
    id: string,
    likedUsers: string[],
    likesCount: number,
    setShowReplyBox?: Dispatch<SetStateAction<boolean>>
}){
    const [count, setCount] = useState(likesCount)
    return(
        <div className='flex gap-2 text-grey-500 items-center'>
            <span className='text-xs block'>
                {time}
            </span>
            <CommentLike id={id} likedUsers={likedUsers} setCount={setCount} />
            {setShowReplyBox && <button 
                className='text-sm block font-medium hover:underline transition-all'
                onClick={()=>setShowReplyBox(true)}
            >
                Reply
            </button>}
            {count !== 0 && 
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className='ml-auto'>
                            <span className='ml-auto flex items-center gap-px text-sm cursor-pointer hover:border-b'> 
                                <HeartSolid size='14' />
                                {count > 1 && <>{count}</>}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <>
                                {likedUsers.map((item, index) => {
                                    if(index > 10) return;
                                    return(
                                        <p
                                            className='block hover:underline pr-4 py-1' 
                                            key={index}
                                        >
                                            @{item}
                                        </p>
                                    )
                                })}
                                {likedUsers.length > 10 && <p>and 24+ more</p>}
                            </>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            }
        </div>
    )
}

export default CommentReactions