import React from 'react'
import Card from './card'
import { PostInterface } from '@/@types'
import { Lock } from 'lucide-react'

function Feeds({
    posts
}:{
    posts: PostInterface[]
}) {
    
    return (
        <div>
            {posts.length ? <div className='space-y-4'>
                {posts.map(item => {
                    return(
                        <Card
                            key={item.id}
                            id={item.id}
                            profilePicture={item.profile_picture}
                            fullName={item.name}
                            username={item.username}
                            date={new Date(item.created_at)}
                            caption={item.content}
                            media={item?.media}
                            likes={item.likes_count}
                            comments={item.comments_count}
                            bookmarks={item.bookmarks_count}
                            isVerified={item.is_verified}
                            likedUsers={item.liked_users}
                        />
                    )
                })}
            </div> : <div className='bg-white py-10 font-semibold text-xl text-center'>
                <span>No Post Yet</span>    
            </div>}
        </div>
    )
}

export default Feeds