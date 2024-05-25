import { endpointGetRequests } from '@/app/action'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Card from './card/card'
import { CommentInterface } from '@/@types'
import { timeAgo } from '@/lib/utils'

function Replies({
    commentId
}:{
    commentId:string
}) {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['replies', commentId],
        queryFn: ()=>endpointGetRequests(`/comment-replies/${commentId}`),
    })

    if (isLoading){
        return <p className='h-4 w-4 rounded-full border-2 border-secondary border-t-grey-100 animate-spin' />
    }

    if(isError){
        console.log(error)
    };
    
    return (
        <div className='pt-2'>
            {data?.map((item: CommentInterface) => {
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

export default Replies