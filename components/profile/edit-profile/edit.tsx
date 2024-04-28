"use client"

import { Edit2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

function Edit({username}:{username: string}) {
    const {user} = useSelector(state => state.user)
    
    return (
        <>
            {user?.username === username && <Link href={"/profile/edit"} className='profile-btn'>
                <Edit2 />
            </Link>}
        </>
    )
}

export default Edit