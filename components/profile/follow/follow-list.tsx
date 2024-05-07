"use client"

import { VerifiedIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Follow from '../profile-picture/follow'
import { UserInterface } from '@/@types'
import { useAppSelector } from '@/lib/hook'
import Link from 'next/link'

function FollowList({
    followers,
    title
}:{
    followers: UserInterface[],
    title: string
}) {
    const {user} = useAppSelector(state => state.user)
    return (
        <>{followers.length ?
            <ul className='p-4'>
                {followers.map(item => {
                    return (
                        <li key={item.id} className='py-2'>
                            <div className='flex gap-3'>
                                <div className='w-11 h-11 overflow-hidden rounded relative'>
                                    <Image
                                        src={item.profile_picture}
                                        fill
                                        alt='Profile image'
                                        className='object-cover object-top'
                                    />
                                </div>
                                <div className='mr-auto'>
                                    <Link 
                                        href={`/${item.username}`} 
                                        className='font-medium leading-none hover:underline block'
                                    >
                                        {item.name} 
                                        {item.is_verified && <VerifiedIcon size={20} color='#40D89D' />}
                                    </Link>
                                    <span className='text-grey-500'>@{item.username}</span>
                                </div>
                                {user?.id !== item.id && <Follow userToFollowId={item.id} />}
                            </div>

                            <p>{item.bio}</p>
                        </li>
                    )
                })}
            </ul> : 
                <div className='flex flex-col items-center gap-5 pt-10'>
                    <Image
                        src={"/empty.svg"}
                        height={270}
                        width={270}
                        alt='Empty Icon'
                    />
                    <p className='text-center text-xl font-medium'>There is no {title} found</p>
                </div>
            }
        </>
    )
}

export default FollowList