'use client'

import { likeReaction } from '@/app/action'
import { useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

function Likes({
    likes,
    postID,
    likedUsers,
}:{
    likes: number
    postID: string
    likedUsers: string
}) {
    const {user} = useAppSelector(state => state.user)
    const [totalLikes, setTotalLikes] = useState<number>(likes);
    const [isLiked, setIsLiked] = useState<boolean>(false)

    useEffect(()=>{
        if(user && likedUsers.includes(user?.username)){
            setIsLiked(true);
        }
    },[user])

    const likePost = async(e: any) => {
        e.target.disabled = true;
        const path = isLiked ? "unlike" : 'like'
        setIsLiked(prevState => !prevState)
        const response = await likeReaction(postID, path);
        e.target.disabled = false;    
        if(response.status === "success"){
            setTotalLikes(response.payload)
        } else {
            setIsLiked(prevState => !prevState)
        }
    }
    
    return (
        <div className='reaction-btn'>
            <button
                className='hover:scale-110 transition-all' 
                onClick={(e)=>likePost(e)}
            >
                {isLiked ? <HeartSolid /> : <Heart/>}
            </button>
            <span className={cn(totalLikes === 0 ? "invisible" : "visible")}>{totalLikes}</span>
        </div>
    )
}

export function HeartSolid({size}:{size?: string}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size ?? "24"} height={size ?? "24"} viewBox="0 0 24 24" fill="none">
            <path className=' fill-red-600' d="M16.44 3.102c-1.81 0-3.43.88-4.44 2.23a5.549 5.549 0 0 0-4.44-2.23c-3.07 0-5.56 2.5-5.56 5.59 0 1.19.19 2.29.52 3.31 1.58 5 6.45 7.99 8.86 8.81.34.12.9.12 1.24 0 2.41-.82 7.28-3.81 8.86-8.81.33-1.02.52-2.12.52-3.31 0-3.09-2.49-5.59-5.56-5.59Z"/>
        </svg>
    )
}

function Heart(){
    return(
        <svg className='fill-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.652c-.31 0-.61-.04-.86-.13-3.82-1.31-9.89-5.96-9.89-12.83 0-3.5 2.83-6.34 6.31-6.34 1.69 0 3.27.66 4.44 1.84a6.214 6.214 0 0 1 4.44-1.84c3.48 0 6.31 2.85 6.31 6.34 0 6.88-6.07 11.52-9.89 12.83-.25.09-.55.13-.86.13Zm-4.44-17.8c-2.65 0-4.81 2.17-4.81 4.84 0 6.83 6.57 10.63 8.88 11.42.18.06.57.06.75 0 2.3-.79 8.88-4.58 8.88-11.42 0-2.67-2.16-4.84-4.81-4.84-1.52 0-2.93.71-3.84 1.94-.28.38-.92.38-1.2 0a4.77 4.77 0 0 0-3.85-1.94Z" />
        </svg>
    )
}

export default Likes