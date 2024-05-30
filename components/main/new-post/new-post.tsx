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
import Post from './post'

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
            <Post 
                defaultText='' 
                defaultMedia={[]} 
                btnText='Publish Post'
                type='new'
            />
        </div>
    )
}

export default NewPost