'use client'

import { endpointPostRequests, endpointUpdateRequests } from '@/app/action'
import { cn, restoreMediaToDefault, uploadSingleMedia } from '@/lib/utils'
import { ImageIcon, SendHorizonal, Smile, Video, X } from 'lucide-react'
import React, { createRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { CommentMedia, Media } from '@/@types'

function EditComment({
    commentID,
    value,
    defaultMedia,
    cancelEdit
}:{
    commentID: string,
    value: string,
    defaultMedia: Media[],
    cancelEdit: ()=>void
}) {
    const [media, setMedia] = useState<CommentMedia>({
        status: defaultMedia.length ? "active" : "pending",
        data: defaultMedia.length ? defaultMedia[0] : null
    })
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = createRef<HTMLInputElement>();

    useEffect(()=>{
        inputRef.current?.focus();

        const closeEdit = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                cancelEdit()
            }
        }

        document.addEventListener("keydown", closeEdit);

        return ()=> document.removeEventListener("keydown", closeEdit);

    },[])

    const editComment = async (formData: FormData) => {
        const comment = formData.get("comment-edit")
        if(!comment) return;
        inputRef.current!.disabled = true;
        const response = await endpointUpdateRequests(`/comment/${commentID}`,{
            content: comment,
            media: media.status === "active" ? [media.data] : [],
        })
        
        if(response?.status === "success"){
            cancelEdit();
            restoreMediaToDefault(setMedia);
        }
        inputRef.current!.disabled = false;
    }
    
    return (
        <div className='flex-1'>
            <form 
                action={editComment}
            >
                <div className='flex-1'>
                    <div className='relative'>
                        <input 
                            ref={inputRef}
                            type="text" 
                            name='comment-edit'
                            id='comment-edit'
                            defaultValue={value}
                            className={cn(
                                    'w-full border border-black text-sm p-2 rounded-2xl focus:border-secondary focus:outline-none disabled:opacity-50', 
                                    isFocused ? "pb-10 pr-2":"pr-7"
                                )} 
                            autoComplete='off'
                            onFocus={()=>setIsFocused(true)}
                        /> 
                        <div 
                            className={cn(
                                'next-element absolute flex items-center transition-all gap-1 text-black-100/70',
                                !isFocused ? "right-2 bottom-1/2 translate-y-1/2" : "bottom-1 left-0 px-2 w-full"
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
            </form>
            <div className='text-sm'>
                <button 
                    className="font-medium text-secondary hover:underline pr-0.5"
                    onClick={cancelEdit}
                >Cancel</button> 
                Press Escape To Cancel
            </div>
        </div>
    )
}

export default EditComment