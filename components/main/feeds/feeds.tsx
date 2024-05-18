import React from 'react'
import Card from './post-cards/card'
import { PostInterface } from '@/@types'
import SharedCard from './post-cards/shared-card'

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
                    return(<>{post.is_shared ? <SharedCard 
                                key={post.id}
                                post={post}
                            /> : <Card
                                key={post.id}
                                post={post}
                            />
                        }
                        </>
                    )
                })}
            </div> : <div className='bg-white py-10 font-semibold text-xl text-center'>
                <span>{emptyText ?? "No Post Yet"}</span>    
            </div>}
        </>
    )
}

export default Feeds