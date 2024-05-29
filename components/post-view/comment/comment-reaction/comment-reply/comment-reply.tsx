'use client'

import { endpointPostRequests } from '@/app/action'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { useAppSelector } from '@/lib/hook'
import { cn, restoreMediaToDefault, uploadSingleMedia } from '@/lib/utils'
import { ImageIcon, SendHorizonal, Smile, Video, X } from 'lucide-react'
import React, { Dispatch, SetStateAction, createRef, useEffect, useOptimistic, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { CommentMedia } from '@/@types'

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
    const [media, setMedia] = useState<CommentMedia>({
        status: "pending",
        data: null
    })
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

    const addReply = async (formData: FormData) => {
        const comment = formData.get("comment-reply")
        if(!comment) return;
        inputRef.current!.value = "";
        addOptimisticComment(comment.toString())
        const data = await endpointPostRequests("/reply-comment",{
            content: comment,
            media: media.status === "active" ? [media.data] : [],
            comment_id: commentID
        })
        if(data?.payload){
            setreplyCount(data.payload);
            toast.success("comment successful");
            restoreMediaToDefault(setMedia);
        }
    }
    
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
                    action={addReply}
                >
                    <div className='flex relative mt-4 gap-1'>
                        <ProfilePictureAvatar
                            size={30}
                            link={user?.profile_picture ?? "/dummy.jpeg"}
                        />
                        <div className='flex-1'>
                            <div className='relative'>
                                <input 
                                    ref={inputRef}
                                    type="text" 
                                    name='comment-reply'
                                    id='comment-reply'
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
                                    {media.status === "pending" && <>
                                        <div>
                                            <label 
                                                htmlFor='reply-image'
                                                className='hover:scale-105 hover:text-primary transition-all'
                                            >
                                                <ImageIcon size={20} />
                                            </label>
                                            <input onChange={(e)=>uploadSingleMedia(e, "image", setMedia)} type="file" name="reply-image" hidden id="reply-image" accept='image/*' />
                                        </div>
                                        <button 
                                            className='hover:scale-105 hover:text-primary transition-all'
                                            type='button'
                                        >
                                            <Video size={24} />
                                        </button>
                                    </>}
                                    <button className='hover:scale-105 hover:text-primary transition-all ml-auto'>
                                        <SendHorizonal size={20} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                {media.status !== "pending" && <div className='relative h-44 w-28 rounded-md overflow-hidden mt-2'>
                                    <button 
                                        className='cancel-btn'
                                        onClick={()=>restoreMediaToDefault(setMedia)}
                                    >
                                        <X size={16}/>
                                    </button>
                                    {media.status === "loading" ? <div className='w-32'/>:<div>
                                        {media.data?.mediaType === "image" ? <Image
                                        src={media.data?.url ?? ""}
                                        fill
                                        alt="preview"
                                        className='object-cover'
                                    /> : <video src={media.data?.url} controls className='h-full w-full object-contain'/>}
                                    </div>}
                                </div>}
                            </div>
                        </div>
                    </div>
                </form>}
        </div>
    )
}

export default CommentReply