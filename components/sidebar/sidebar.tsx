"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import Card from './card'
import { Bell, Bookmark, ChevronLeft, CircleEllipsis, Home, LogOut, Mail, NotepadTextIcon, User2 } from 'lucide-react'
import { cn } from '@/lib/utils'

function Sidebar() {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    const collapseMenu = () => {
        setIsMenuCollapsed(prevState => !prevState)
    }


    return (
        <aside className={cn('rounded-xl relative w-fit transition-all h-full', isMenuCollapsed ? "bg-secondary" : "bg-white")}>
            <button 
                onClick={collapseMenu}
                className='h-[30px] w-[30px] z-10 rounded-full border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white transition-all grid place-content-center absolute top-16 -right-[15px]'
            >
                <ChevronLeft className={cn(isMenuCollapsed ? "rotate-180" : "rotate-0", "transition-all")} /> 
            </button>
            <header className={cn('pt-10 pb-5 relative', isMenuCollapsed ? "px-4" : "")}>
                {!isMenuCollapsed && <div className="h-20 w-full bg-primary/10 absolute top-0 left-0"/>}
                <div className={cn('mx-auto relative rounded-full border-4 border-white overflow-hidden', isMenuCollapsed ? "h-16 w-16" : "h-20 w-20")}>
                    <Image
                        src={"https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        fill
                        alt='Profile Image'
                        className='object-cover object-top'
                    />
                </div>
                {!isMenuCollapsed && <h4 className='text-xl font-medium text-center mt-1'>Edimulo Ebamb</h4>}
            </header>
            <nav className='px-4 pb-10'>
                <ul className={cn('text-[#0F1419]', isMenuCollapsed ? "space-y-2.5" : "space-y-1")}>
                    <Card
                        Icon={Home}
                        text='home'
                        menuCollapsed={isMenuCollapsed}
                    />
                    <Card
                        Icon={Bell}
                        text='notification'
                        menuCollapsed={isMenuCollapsed}
                    />
                    <Card
                        Icon={Mail}
                        text='messages'
                        menuCollapsed={isMenuCollapsed}
                    />
                    <Card
                        Icon={Bookmark}
                        text='collection'
                        menuCollapsed={isMenuCollapsed}
                    />
                    <Card
                        Icon={NotepadTextIcon}
                        text='subscription'
                        menuCollapsed={isMenuCollapsed}
                    />
                    <Card
                        Icon={User2}
                        text='profile'
                        menuCollapsed={isMenuCollapsed}
                    />
                    <Card
                        Icon={CircleEllipsis}
                        text='more'
                        menuCollapsed={isMenuCollapsed}
                    />
                </ul>
            </nav>
            {isMenuCollapsed && <button className='mt-auto w-full bg-[#00D2A8] text-white flex justify-center py-4 rounded-md cursor-pointer hover:bg-black/10'>
                <LogOut />
            </button>}
        </aside>
    )
}

export default Sidebar