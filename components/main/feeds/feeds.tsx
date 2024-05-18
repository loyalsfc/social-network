import React from 'react'
import Card from './card'
import { PostInterface } from '@/@types'

function Feeds({
    posts,
    emptyText,
}:{
    posts: PostInterface[],
    emptyText?: string
}) {
    
    return (
        <>
            {posts.length ? <div className='space-y-4'>
                {posts.map(post => {
                    return(
                        <Card
                            key={post.id}
                            post={post}
                        />
                    )
                })}
            </div> : <div className='bg-white py-10 font-semibold text-xl text-center'>
                <span>{emptyText ?? "No Post Yet"}</span>    
            </div>}
        </>
    )
}

export default Feeds