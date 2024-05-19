import { getComments, getPost } from '@/app/action'
import Comments from '@/components/post-view/comments'
import PostView from '@/components/post-view/post-view'
import Suggestionbar from '@/components/suggestionbar/suggestionbar'
import React from 'react'

async function Page({params}:{params: {id: string}}) {
    const postFunc = getPost(params.id)
    const commentsFunc = getComments(params.id)
    const [post, comments] = await Promise.all([postFunc, commentsFunc])

    return (
        <main className="flex-1 h-full flex overflow-x-hidden">
            <div className="px-4 lg:px-10 h-full overflow-y-scroll flex-1">
                <PostView post={post} />
                <Comments comments={comments} />
            </div>
            <Suggestionbar />
        </main>
    )
}

export default Page