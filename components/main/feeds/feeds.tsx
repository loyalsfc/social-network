import React from 'react'
import Card from './card'
import { PostInterface } from '@/@types'

function Feeds({
    posts
}:{
    posts: PostInterface[]
}) {
    return (
        <div className='space-y-4'>
            {posts.map(item => {
                return(
                    <Card
                        key={item.id}
                        profilePicture={item.profile_picture}
                        fullName={item.name}
                        username={item.username}
                        date={new Date(item.created_at)}
                        caption={item.content}
                        media={item?.media}
                        likes={400}
                        comments={20}
                        bookmarks={3000}
                        isVerified={item.is_verified}
                    />
                )
            })}
        </div>
    )
}

export default Feeds