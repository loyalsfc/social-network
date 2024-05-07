"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function FollowLink({
    link,
    text
}:{
    link: string,
    text: string
}) {
    const pathname = usePathname()
    return (
        <Link
            href={link}
            className={cn('tab', pathname?.includes(link) && "active-tabs")}
        >
            {text}
        </Link>
    )
}

export default FollowLink