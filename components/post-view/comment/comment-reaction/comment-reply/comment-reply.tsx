'use client'

import { endpointPostRequests } from '@/app/action'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import { Image, SendHorizonal, Smile, Video } from 'lucide-react'
import React, { Dispatch, SetStateAction, createRef, useEffect, useOptimistic, useState } from 'react'
import { toast } from 'react-toastify'

type Comment = {
    comment: string
}

function CommentReply({
    isShown, 
    commentID,
    className,
    setreplyCount
}:{
    isShown: boolean, 
    commentID: string,
    className?: string
    setreplyCount: Dispatch<SetStateAction<number>>
}) {
    const [isFocused, setIsFocused] = useState(false)
    const {user} = useAppSelector(state => state.user);
    const inputRef = createRef<HTMLInputElement>();
    const [optimisticComments, addOptimisticComment] = useOptimistic<
        Comment[],
        string
    >([], (state, newComment) => [...state, { comment: newComment}])

    useEffect(()=>{
        if(isShown){
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
                        const data = await endpointPostRequests("/reply-comment",{
                            reply_text: comment,
                            media: [],
                            comment_id: commentID
                        })
                        if(data?.payload){
                            setreplyCount(data.payload)
                            toast.success("comment successful")
                        }
                    }}
                >
                    <div className='flex relative mt-4 gap-1'>
                        <ProfilePictureAvatar
                            size={30}
                            link={user?.profile_picture ?? "/dummy.jpeg"}
                        />
                        <div className='relative flex-1'>
                            <input 
                                ref={inputRef}
                                type="text" 
                                name='comment'
                                id='comment'
                                className={cn(
                                        'w-full border border-black text-sm p-2 rounded-2xl focus:border-secondary focus:outline-none', 
                                        isFocused ? "pb-10 pr-2":"pr-7"
                                    )} 
                                autoComplete='off'
                                onFocus={()=>setIsFocused(true)}
                            /> 
                            <div 
                                className={cn(
                                    'next-element absolute flex items-center transition-all gap-1 text-black-100/70 w-full',
                                    !isFocused ? "right-2 bottom-1/2 translate-y-1/2" : "bottom-1 left-0 px-2"
                                )}
                            >
                                <button 
                                    className='hover:scale-105 hover:text-primary transition-all'
                                    type='button'
                                >
                                    <Smile size={20} />
                                </button>
                                <button 
                                    className='hover:scale-105 hover:text-primary transition-all'
                                    type='button'
                                >
                                    <Image size={20} />
                                </button>
                                <button 
                                    className='hover:scale-105 hover:text-primary transition-all'
                                    type='button'
                                >
                                    <Video size={24} />
                                </button>
                                <button className='hover:scale-105 hover:text-primary transition-all ml-auto'>
                                    <SendHorizonal size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>}
        </div>
    )
}

export default CommentReply