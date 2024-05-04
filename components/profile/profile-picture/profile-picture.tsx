'use client'

import Image from 'next/image'
import React from 'react'
import dummyProfile from '../../../public/dummy.jpg'
import EditProfilePicture from './edit-profile-picture'
import { useAppSelector } from '@/lib/hook'

function ProfilePicture() {
    const {user} = useAppSelector(state => state.user)

    return (
        <div className='relative border-4 w-32 -mt-12 h-[118px] border-white rounded-md mr-auto group'>
            <Image
                src={user?.profile_picture ? user?.profile_picture : dummyProfile}
                fill
                alt='Profile image'
                className='object-cover object-top'
            />
            <div className='h-full w-full bg-black/30 hidden place-content-center group-hover:grid absolute top-0 left-0'>
                <EditProfilePicture />
            </div>
        </div>
    )
}

export default ProfilePicture