import { getPost } from '@/app/action'
import PostView from '@/components/post-view/post-view'
import React, { ReactNode } from 'react'

async function PostLayout({params}:{params: {id: string}}) {
    const post = await getPost(params.id)

    return (
        <main className="flex-1 h-full flex overflow-x-hidden">
            <div className="h-full overflow-y-scroll">
                <PostView post={post} showMenu={false} />
            </div>
        </main>
    )
}

export default PostLayout