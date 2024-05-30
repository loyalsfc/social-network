'use client'

import EmojiPicker from 'emoji-picker-react';
import { endpointUpdateRequests, newPost } from '@/app/action'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/lib/hook'
import { handleImageUpload } from '@/lib/utils'
import { CalendarClock, ImageIcon, Smile, Video, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { createRef, useState } from 'react'
import { toast } from 'react-toastify'
import InputEmoji from "react-input-emoji";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Emoji from '@/components/emoji/emoji';


interface Media {
    mediaType: "video" | "image";
    url: string;
}

function Post({
    defaultText,
    defaultMedia,
    btnText,
    type,
    id,
    close
}:{
    defaultText: string,
    defaultMedia: Media[],
    btnText: string,
    type: "new" | "update",
    id?: string,
    close?: ()=> void
}) {
    const [successNotification, setSuccessNotification] = useState({
        postID: "",
        isShown: false
    })
    const [blobs, setBlobs] = useState<Media[]>(defaultMedia);
    const [postContent, setPostContent] = useState<string>(defaultText);
    const {user} = useAppSelector(state => state.user);
    const router = useRouter();
    const inputRef = createRef<HTMLTextAreaElement>()

    const removeMedia = (url: string) => {
        setBlobs(prevState => {
            return prevState.filter(item => item.url !== url)
        })
    }

    const publishPost = async() => {
        const data = {
            user_id: user?.id,
            content: postContent,
            media: blobs
        }
        if(type === "update") {
            const response = await endpointUpdateRequests(`/post/${id}`, {
                content: postContent,
                media: blobs
            })

            if(response.status === "success") {
                toast.success("Post edit successful");
                close && close();
            }
            router.refresh();
            return; 
        }

        const post = await newPost(data) 
        if(!post.error){
            setBlobs([])
            setPostContent("")
            setSuccessNotification({
                postID: post.id,
                isShown: true
            })
            
            setTimeout(()=>{
                setSuccessNotification({
                    postID: '',
                    isShown: false
                })
            },5000)
        };
    }

    return (
        <div className=''>
            <textarea 
                className='border-none resize-none mb-2 focus:outline-none focus:outline-transparent focus:outline-0 focus:border-none py-2 block w-full'
                placeholder="What's Happening?"
                onChange={(e)=>{
                    setPostContent(e.target.value)
                }}
                value={postContent}
                rows={3}
                ref={inputRef}
            />
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <div>
                        <label htmlFor='upload-image' className='text-black/60 hover:scale-105 transition-all'>
                            <ImageIcon/>
                        </label>
                        <input 
                            onChange={(e)=>handleImageUpload(e, "image", setBlobs)} 
                            type="file" 
                            name="upload-image" 
                            id="upload-image"
                            hidden 
                            accept='image/*' 
                            multiple
                        />
                    </div>
                    <div>
                        <label htmlFor='upload-video' className='text-black/60 hover:scale-105 transition-all'>
                            <Video/>
                        </label>
                        <input 
                            onChange={(e)=>handleImageUpload(e, "video", setBlobs)} 
                            type="file" 
                            name="upload-video" 
                            id="upload-video"
                            hidden 
                            accept='video/*' 
                            multiple
                        />
                    </div>
                    <Emoji 
                        setContent={setPostContent}
                        inputRef={inputRef}
                    />
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <CalendarClock />
                    </button>
                </div>
                <Button 
                    className='bg-secondary shadow-2xl text-white hover:opacity-85 transition-all'
                    disabled = {postContent === "" && blobs.length === 0}
                    onClick={publishPost}
                >
                    {btnText}
                </Button>
            </div>
            <div className='flex gap-2 pt-3 overflow-x-scroll'>
                {blobs.map((item, index) => {
                    return(
                        <div className='h-56 w-40 shrink-0 relative rounded overflow-hidden' key={index}>
                            <button 
                                className='cancel-btn'
                                onClick={()=>removeMedia(item.url ?? "")}
                            >
                                <X color='#FFF' size={16} />
                            </button>
                            {item.mediaType === "image" ? <Image
                                src={item.url}
                                fill
                                alt='Uploads'
                                className='object-cover object-top'
                            /> : item.mediaType === "video" ? <video src={item.url} controls className='h-full w-full object-contain'>

                                </video> : null}
                        </div>
                    )
                })}
            </div>

            {successNotification.isShown && <div className='fixed bottom-10 left-1/2 -translate-x-1/2 rounded py-2 px-4 bg-secondary'>
                <span className='text-center text-white text-sm font-semibold'>
                    Post Successful <Link className='hover:underline' href={`/post/${successNotification.postID}`}>See post</Link>
                </span>
            </div>}
        </div>
    )
}

export default Post