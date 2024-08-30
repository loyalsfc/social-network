import { PostInterface } from '@/@types';
import { getPost } from '@/app/action';
import Embeded from '@/components/embeded/embeded';
import React from 'react';

async function PostLayout({params}:{params: {id: string}}) {
    const post = await getPost(params.id) as PostInterface;

    return (
        <Embeded post={post} />
    )
}

export default PostLayout