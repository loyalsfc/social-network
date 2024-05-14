'use client'

import { bookmarkPost } from '@/app/action'
import { useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Bookmarks({
    bookmark_count,
    postID,
    bookmarkedUsers,
}:{
    bookmark_count: number
    postID: string
    bookmarkedUsers: string
}) {
    const {user} = useAppSelector(state => state.user)
    const [totalBookmarks, setTotalBookmarks] = useState<number>(bookmark_count);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(()=>{
        if(user && bookmarkedUsers?.includes(user?.username)){
            setIsBookmarked(true);
        }
    },[user])

    const likePost = async(e: any) => {
        e.target.disabled = true;
        setIsBookmarked(prevState => !prevState);
        const path = isBookmarked ? "remove-bookmarks" : 'add-bookmarks';
        const response = await bookmarkPost(postID, path);
        if(response.status === "successful"){
            setTotalBookmarks(response.payload);
            const toastMessage = !isBookmarked ? "Post Added to Bookmarks" : "Post Removed from Bookmarks";
            toast.success(toastMessage);
        } else {
            setIsBookmarked(prevState => !prevState);
        }
        e.target.disabled = false;
    }
    
    return (
        <div className='reaction-btn'>
            <button
                className='hover:scale-110 transition-all' 
                onClick={(e)=>likePost(e)}
            >
                {isBookmarked ? <BookmarkSolid /> : <Bookmark/>}
            </button>
            <span className={cn(totalBookmarks === 0 ? "invisible" : "visible")}>{totalBookmarks}</span>
        </div>
    )
}

export function BookmarkSolid(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path className='fill-secondary' d="M17 4.96v7.12c0 1.99-1.41 2.76-3.14 1.72l-1.32-.8c-.3-.18-.78-.18-1.08 0l-1.32.8C8.41 14.84 7 14.07 7 12.08V4.99C7.01 3 8.01 2 10 2h4c1.98 0 2.98.99 3 2.96Z"/>
            <path className='fill-secondary' d="M22 11.9v3.03c0 5.05-2 7.07-7 7.07H9c-5 0-7-2.02-7-7.07V11.9c0-2.69.57-4.52 1.85-5.64.65-.55 1.65-.07 1.65.78v5.04c0 1.49.61 2.69 1.67 3.29 1.07.61 2.43.5 3.75-.29l1.08-.65 1.09.65c.74.45 1.51.68 2.23.68.54 0 1.05-.13 1.51-.39 1.06-.6 1.67-1.8 1.67-3.29V7.03c0-.85 1.01-1.33 1.65-.77C21.43 7.38 22 9.21 22 11.9Z"/>
        </svg>
    )
}

function Bookmark(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2c2 0 3 1.01 3 3.03v7.05c0 1.99-1.41 2.76-3.14 1.72l-1.32-.8c-.3-.18-.78-.18-1.08 0l-1.32.8C8.41 14.84 7 14.07 7 12.08V5.03C7 3.01 8 2 10 2h4Z" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.82 4.99C3.41 5.56 2 7.66 2 11.9v3.03C2 19.98 4 22 9 22h6c5 0 7-2.02 7-7.07V11.9c0-4.31-1.46-6.42-5-6.94" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default Bookmarks