"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    Icon: React.FC,
    text: string,
    menuCollapsed: boolean,
    link?: string
}

function Card({Icon, text, menuCollapsed, link}: Props) {
    const pathName = usePathname()
    const route = `/${text === "home" ? "" : link ?? text}`
    
    return (
        <li className={cn(pathName === route ? "bg-secondary text-white" : "", "rounded-md ")}>
            <Link
                href={route}
                className={cn('flex items-center gap-7 py-2 rounded-md cursor-pointer hover:bg-black/10', menuCollapsed ? "justify-center px-4 text-white" : "px-6")}
            >
                <Icon /> 
                {!menuCollapsed && <span className='text-lg capitalize font-medium'>{text}</span>}
            </Link>
        </li>
    )
}

export default Card