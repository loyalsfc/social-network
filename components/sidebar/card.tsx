"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    Icon: React.FC,
    text: string
}

function Card({Icon, text}: Props) {
    const pathName = usePathname()
    const route = `/${text === "home" ? "" : text}`
    
    return (
        <li className={cn(pathName === route ? "bg-secondary text-white" : "", "rounded-md ")}>
            <Link
                href={route}
                className='flex items-center gap-7 px-6 py-2 rounded-md cursor-pointer hover:bg-black/10'
            >
                <Icon /> 
                <span className='text-lg capitalize font-medium'>{text}</span>
            </Link>
        </li>
    )
}

export default Card