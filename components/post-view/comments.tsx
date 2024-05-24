import { CommentInterface } from '@/@types'
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Card from './comment/card/card'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo("en-US")

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