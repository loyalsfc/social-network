import { CommentInterface } from '@/@types'
import React from 'react'
import Card from './comment/card/card'
import { timeAgo } from '@/lib/utils'

function Comments({
    comments
}:{
    comments: CommentInterface[]
}) {
    return (
        <div className='bg-white px-4'>
            {comments.map(item => {
                return(
                    <Card
                        key={item.id}
                        comment={item}
                        time={timeAgo.format(new Date(item.created_at), "mini-now")}
                    />
                )
            })}
        </div>
    )
}

export default Comments