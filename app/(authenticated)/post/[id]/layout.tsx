import { endpointGetRequests, getPost } from '@/app/action'
import Comments from '@/components/post-view/comments'
import PostView from '@/components/post-view/post-view'
import Suggestionbar from '@/components/suggestionbar/suggestionbar'
import React, { ReactNode } from 'react'
import { cookies } from "next/headers";
import { UserInterface } from '@/@types'
import NotFound from '@/components/not-found/not-found'


async function PostLayout({params, children}:{params: {id: string}, children: ReactNode}) {
    const user = cookies().get("user-details")?.value;
    const userObj = JSON.parse(user ?? "") as UserInterface;
    const postFunc = endpointGetRequests(`/post/${params.id}?userId=${userObj.id}`);
    const commentsFunc = endpointGetRequests(`/post-comments/${params.id}`);
    const [post, comments] = await Promise.all([postFunc, commentsFunc]);

    return (
        <main className="flex-1 h-full flex overflow-x-hidden">
            {children}
            {post?.error ? <div className='flex-1 h-full flex items-center justify-center'>
                    <NotFound /> 
                </div> :
                <div className="px-4 lg:px-10 h-full overflow-y-scroll flex-1">
                    <PostView 
                        post={post} 
                        showMenu={true}
                        comments={comments}
                    />
                </div>
            }
            <Suggestionbar />
        </main>
    )
}

export default PostLayout