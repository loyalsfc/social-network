import { CommentInterface } from '@/@types'
import React from 'react'
import Card from './comment/card/card'
import { cn, timeAgo } from '@/lib/utils'

function Comments({
    comments,
    className
}:{
    comments: CommentInterface[];
    className: string;
}) {
    return (
        <div className={cn('bg-white', className)}>
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