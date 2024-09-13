'use client'

import React from 'react'
import dummyData from '@/data/dummy-data'
import Card from './card'
import { useAppSelector } from '@/lib/hook'
import { Plus } from 'lucide-react'


function Stories() {
    const {user} = useAppSelector(state => state.user)
    return (
        <div>
            <div className='flex gap-6 p-6 overflow-x-scroll'>
                <div className='relative'>
                    {user && <Card
                        profileImage={user.profile_picture}
                        name='You'
                    />}
                    <button className='absolute left-1/2 -translate-x-1/2 bottom-4 z-10 bg-white rounded-full p-1 shadow'>
                        <Plus />
                    </button>
                </div>
                {dummyData.map((item, index) => {
                    return <Card 
                        key={index} 
                        profileImage={item.profileImage} 
                        name={item.name}
                    />
                })}
            </div>
        </div>
    )
}

export default Stories