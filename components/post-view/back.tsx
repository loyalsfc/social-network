'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Back() {
    const router = useRouter()
    return (
        <button onClick={()=>router.back()}><ArrowLeft/></button>
    )
}

export default Back