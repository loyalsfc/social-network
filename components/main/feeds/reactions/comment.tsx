'use client'

import { insertComment } from '@/app/action'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import { SendHorizonal } from 'lucide-react'
import React, { Dispatch, SetStateAction, createRef, useEffect, useOptimistic } from 'react'
import { toast } from 'react-toastify'

type Comment = {
    comment: string
}

function CommentBox({
    isShown, 
    postID,
    setCommentCount,
    className,
    fixedCommentBox
}:{
    isShown: boolean, 
    postID: string,
    setCommentCount: Dispatch<SetStateAction<number>>,
    className?: string
    fixedCommentBox: boolean
}) {
    const {user} = useAppSelector(state => state.user);
    const inputRef = createRef<HTMLInputElement>();
    const [optimisticComments, addOptimisticComment] = useOptimistic<
        Comment[],
        string
    >([], (state, newComment) => [...state, { comment: newComment}])

    useEffect(()=>{
        if(isShown && !fixedCommentBox){
            inputRef.current?.focus();
        }
    },[isShown])
    
    return (
        <div className={cn('flex flex-col', className)}>
            <div>
                {optimisticComments?.map((item, index) => {
                    return(
                        <div key={index} className='flex items-center gap-2'>
                            <ProfilePictureAvatar
                                size={42}
                                link={user?.profile_picture ?? "/dummy.jpeg"}
                            />
                            <p className='opacity-50'>{item.comment}</p>
                        </div> 
                    )
                })}
            </div>
            {isShown && 
                <form 
                    action={async (formData: FormData) => {
                        const comment = formData.get("comment")
                        if(!comment) return;
                        inputRef.current!.value = "";
                        addOptimisticComment(comment.toString())
                        const data = await insertComment({
                            content: comment,
                            media: [],
                            post_id: postID
                        })
                        if(data?.payload){
                            setCommentCount(data?.payload)
                            toast.success("comment successful")
                        }
                    }}
                >
                    <div className='flex relative mt-4 gap-1'>
                        <ProfilePictureAvatar
                            size={42}
                            link={user?.profile_picture ?? "/dummy.jpeg"}
                        />
                        <input 
                            ref={inputRef}
                            type="text" 
                            name='comment'
                            id='comment'
                            className='w-full border border-black rounded-full p-2 pr-7 focus:border-secondary focus:outline-secondary' 
                        /> 
                        <button className='absolute right-2 top-1/2 -translate-y-1/2 hover:scale-105 transition-all'>
                            <SendHorizonal />
                        </button>
                    </div>
                </form>}
        </div>
    )
}

export default CommentBox