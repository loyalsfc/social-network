import React from 'react'
import { X } from 'lucide-react';
import Post from '@/components/main/new-post/post';
import { PostInterface } from '@/@types';

interface Props{
    post: PostInterface
    closeEdit: ()=>void;
}

function EditPost({
    post,
    closeEdit, 
}:Props) {
    return (
        <div className='fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center'>
            <div onClick={closeEdit} className="absolute h-full w-full bg-black/30"/>
            <div className='flex flex-col bg-white w-full max-w-xl shrink-0 z-50 rounded-xl shadow pb-6'>
                <h4 className='relative border-b py-4'>
                    <span className='text-xl font-semibold block text-center'>Edit Post</span>
                    <button 
                        className='absolute top-1/3 right-4 h-8 w-8 rounded-full hover:bg-black/30 grid place-content-center'
                        onClick={closeEdit}
                    ><X /></button>
                </h4>
                <div className='px-8'>
                    <Post
                        defaultText={post.content}
                        defaultMedia={post.media}
                        btnText='Update Post'
                        id={post.id}
                        type='update'
                        close={closeEdit}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditPost