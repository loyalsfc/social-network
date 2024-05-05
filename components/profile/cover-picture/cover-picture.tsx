"use client"

import { useAppSelector } from '@/lib/hook'
import React from 'react'
import EditCoverPicture from './edit-cover-picture'
import RemoveCoverPicture from './remove-cover-picture'

function CoverPicture() {
    const {user} = useAppSelector(state => state.user)

    return (
        <div 
            className='h-[189px] w-full bg-cover relative group'
            style={{backgroundImage: `url('${user?.cover_picture}')`}}
        >
            <div className='absolute top-0 left-0 bg-black/30 hidden group-hover:grid h-full w-full place-content-center'>
                <div className='flex space-x-4'>
                    <EditCoverPicture />
                    <RemoveCoverPicture />
                </div>
            </div>
        </div>
    )
}

export default CoverPicture