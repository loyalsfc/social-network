"use client"

import Image from 'next/image'
import React from 'react'
import Card from './card'
import { Bell, Bookmark, ChevronLeft, CircleEllipsis, Home, Mail, NotepadTextIcon, User2 } from 'lucide-react'

function Sidebar() {
    return (
        <aside className='rounded-xl relative bg-white w-fit'>
            <header className='pt-10 pb-5 relative'>
                <div className="h-20 w-full bg-primary/10 absolute top-0 left-0"/>
                <div className='h-20 w-20 mx-auto relative rounded-full border-4 border-white overflow-hidden'>
                    <Image
                        src={"https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        fill
                        alt='Profile Image'
                        className='object-cover object-top'
                    />
                </div>
                <h4 className='text-xl font-medium text-center mt-1'>Edimulo Ebamb</h4>
                <button className='h-[30px] w-[30px] rounded-full border-2 border-primary text-primary bg-white grid place-content-center absolute top-16 -right-[15px]'>
                    <ChevronLeft />
                </button>
            </header>
            <nav className='px-4 pb-10'>
                <ul className='text-[#0F1419] space-y-1'>
                    <Card
                        Icon={Home}
                        text='home'
                    />
                    <Card
                        Icon={Bell}
                        text='notification'
                    />
                    <Card
                        Icon={Mail}
                        text='messages'
                    />
                    <Card
                        Icon={Bookmark}
                        text='collection'
                    />
                    <Card
                        Icon={NotepadTextIcon}
                        text='subscription'
                    />
                    <Card
                        Icon={User2}
                        text='profile'
                    />
                    <Card
                        Icon={CircleEllipsis}
                        text='more'
                    />
                </ul>
            </nav>
            
        </aside>
    )
}

export default Sidebar