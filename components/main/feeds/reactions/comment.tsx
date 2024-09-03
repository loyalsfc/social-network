'use client'

import { CommentMedia } from '@/@types'
import { insertComment } from '@/app/action'
import Emoji from '@/components/emoji/emoji'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { useAppSelector } from '@/lib/hook'
import { cn, restoreMediaToDefault, uploadSingleMedia } from '@/lib/utils'
import { ImageIcon, SendHorizonal, Video, X } from 'lucide-react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, createRef, useEffect, useOptimistic, useState } from 'react'
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
    const [commentText, setCommentText] = useState<string>("")
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
        if(isShown && !fixedCommentBox){
            inputRef.current?.focus();
        }
    },[isShown])

    const addComment = async (formData: FormData) => {
            const comment = formData.get("comment")
            if(!comment) return;
            inputRef.current!.value = "";
            addOptimisticComment(comment.toString())
            const data = await insertComment({
                content: comment,
                media: media.status === "active" ? [media.data] : [],
                post_id: postID
            })
            if(data?.payload){
                setCommentCount(data?.payload);
                toast.success("comment successful");
                restoreMediaToDefault(setMedia);
                setCommentText("");
                setIsFocused(false);
            }
    }
    
    return (
        <div className={cn('flex flex-col relative', className)}>
            <div className='h-32 bg-white w-52 shrink-0 absolute hidden left-11 -top-28 z-10 shadow-lg rounded p-4'>
                @muiz
            </div>
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
                    action={addComment}
                >
                    <div className='flex relative mt-4 gap-1'>
                        <ProfilePictureAvatar
                            size={42}
                            link={user?.profile_picture ?? "/dummy.jpeg"}
                        />
                        <div className="flex-1">
                            <div className='relative'>
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
                                    value={commentText}
                                    onChange={(e)=>setCommentText(e.target.value)}
                                /> 
                                <div 
                                    className={cn(
                                        'next-element absolute flex items-center transition-all gap-1 text-black-100/70',
                                        !isFocused ? "right-2 bottom-1/2 translate-y-1/2 w-fit" : "bottom-1 left-0 px-2 w-full"
                                    )}
                                >
                                    <Emoji
                                        inputRef={inputRef}
                                        setContent={setCommentText}
                                        iconSize={20}
                                    />  
                                    {media.status === "pending" && <>
                                        <div>
                                            <label 
                                                htmlFor='comment-image'
                                                className='hover:scale-105 hover:text-primary transition-all'
                                            >
                                                <ImageIcon size={20} />
                                            </label>
                                            <input onChange={(e)=>uploadSingleMedia(e, "image", setMedia)} type="file" name="comment-image" hidden id="comment-image" accept='image/*' />
                                        </div>
                                        <button 
                                            className='hover:scale-105 hover:text-primary transition-all'
                                            type='button'
                                        >
                                            <Video size={24} />
                                        </button>
                                    </>}
                                    <button
                                        disabled={commentText === ""} 
                                        className={cn('hover:scale-105 disabled:opacity-30 hover:text-primary transition-all', isFocused && 'ml-auto')}
                                    >
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
                        {/* <input 
                            ref={inputRef}
                            type="text" 
                            name='comment'
                            id='comment'
                            className='w-full border border-black rounded-full p-2 pr-7 focus:border-secondary focus:outline-secondary' 
                            autoComplete='off'
                        /> 
                        <button className='absolute right-2 top-1/2 -translate-y-1/2 hover:scale-105 transition-all'>
                            <SendHorizonal />
                        </button> */}
                    </div>
                </form>}
        </div>
    )
}

export default CommentBox