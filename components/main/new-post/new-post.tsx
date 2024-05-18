'use client'

import { newPost } from '@/app/action'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAppSelector } from '@/lib/hook'
import { handleImageUpload, uploadImage } from '@/lib/utils'
import { CalendarClock, ImageIcon, Smile, Video, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, createRef, useState } from 'react'

interface Media {
    mediaType: "video" | "image";
    url: string;
}

function NewPost() {
    const [successNotification, setSuccessNotification] = useState({
        postID: "",
        isShown: false
    })
    const [blobs, setBlobs] = useState<Media[]>([]);
    const [postContent, setPostContent] = useState<string>("");
    const {user} = useAppSelector(state => state.user)

    // const handleImageUpload = async(e: ChangeEvent<HTMLInputElement>, mediaType: "image" | "video") => {
    //     const files = e.target.files;

    //     if(!files) return;

    //     for (let index = 0; index < files?.length; index++) {
    //         if (index === 0) console.log(files[0])
    //         const file = files[index];
    //         const data = await uploadImage(file)
    //         // const url = URL.createObjectURL(file)
    //         if(!data?.secure_url) return;
    //         setBlobs(prevState => [...prevState, {
    //             mediaType,
    //             url: data?.secure_url
    //         }])
    //     }
    // }

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
        <div className='border-b border-b-grey p-4'>
            <Textarea 
                className='border-none resize-none mb-2 focus:outline-none focus:outline-transparent focus:outline-0 focus:border-none'
                placeholder="What's Happening?"
                onChange={(e)=>{
                    setPostContent(e.target.value)
                }}
                value={postContent}
            />
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <div>
                        <label htmlFor='upload-image' className='text-black/60 hover:scale-105 transition-all'>
                            <ImageIcon/>
                        </label>
                        <input onChange={(e)=>handleImageUpload(e, "video", setBlobs)} type="file" name="upload-image" id="upload-image" hidden accept='image/*' multiple/>
                    </div>
                    <div>
                        <label htmlFor='upload-video' className='text-black/60 hover:scale-105 transition-all'>
                            <Video/>
                        </label>
                        <input onChange={(e)=>handleImageUpload(e, "video", setBlobs)} type="file" name="upload-video" id="upload-video" hidden accept='video/*' multiple/>
                    </div>
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <Smile/>
                    </button>
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <CalendarClock />
                    </button>
                </div>
                <Button 
                    className='bg-secondary shadow-2xl text-white hover:opacity-85 transition-all'
                    disabled = {postContent === "" && blobs.length === 0}
                    onClick={publishPost}
                >
                    Publish Post
                </Button>
            </div>
            <div className='flex gap-2 pt-3 overflow-x-scroll'>
                {blobs.map((item, index) => {
                    return(
                        <div className='h-56 w-40 shrink-0 relative rounded overflow-hidden' key={index}>
                            <button 
                                className='z-10 absolute top-2 right-2 h-6 w-6 grid place-content-center bg-black/20 hover:bg-black/30 rounded-full'
                                onClick={()=>removeMedia(item.url)}
                            >
                                <X color='#FFF' size={16} />
                            </button>
                            {item.mediaType === "image" ? <Image
                                src={item.url}
                                fill
                                alt='Uploads'
                                className='object-cover object-top'
                            /> : <video src={item.url} controls className='h-full w-full object-contain'>

                                </video>}
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

export default NewPost