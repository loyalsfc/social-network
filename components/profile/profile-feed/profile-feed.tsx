"use client"

import Feeds from '@/components/main/feeds/feeds'
import React from 'react'
import Media from '../media/media'
import { PostInterface } from '@/@types'
import { useAppSelector } from '@/lib/hook'

function ProfileFeed({
    posts,
    profileId,
    username
}:{
    posts: PostInterface[],
    profileId: string,
    username: string
}) {
    const {blocks} = useAppSelector(state => state.block);

    return (
        <>
            {blocks.find(item => item === profileId) ? <div className='px-4 py-10 flex flex-col items-center justify-center'>
                    <h4 className='font-bold text-3xl'>You have blocked @{username}</h4>
                    <p className='text-grey-100 font-medium'>Please unblock them to see their post</p>
                </div> :
                <section className='py-4 grid grid-cols-10 gap-4'>
                    <div className='col-span-6'>
                        <Feeds posts={posts} />
                    </div>
                    <div className="col-span-4">
                        <div className='bg-white p-4'>
                            <h4 className='text-dark text-xl font-medium mb-6'>Media</h4>
                            <Media post={posts} />
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ProfileFeed