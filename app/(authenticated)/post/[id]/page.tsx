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
                <PostView
                    id={post.id}
                    profilePicture={post.profile_picture}
                    fullName={post.name}
                    username={post.username}
                    date={new Date(post.created_at)}
                    caption={post.content}
                    media={post.media}
                    likes={post.likes_count}
                    commentsCount={post.comments_count}
                    likedUsers={post.liked_users}
                    bookmarks={post.bookmarks_count}
                    isVerified={post.is_verified}
                    bookmarkedUsers={post.bookmarked_users}
                />
                <Comments comments={comments} />
            </div>
            <Suggestionbar />
        </main>
    )
}

export default Page