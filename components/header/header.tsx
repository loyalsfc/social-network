"use client"

import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'
import { Bell, Search } from 'lucide-react'
import Logo from '../logo/logo'
import Link from 'next/link'

function Header() {
    return (
        <header className='bg-white py-2.5'>
            <div className='max-w-7xl mx-auto flex items-center justify-between'>
                <Link href={"/"}><Logo /></Link>

                <div className='w-full max-w-4xl rounded-full overflow-hidden relative'>
                    <Input className='w-full border border-black/15 h-11 rounded-full focus:border-primary' />
                    <button className='absolute grid place-content-center text-white rounded-full right-1 top-1 h-9 w-9 bg-primary'>
                        <Search />
                    </button>
                </div>

                <button className='grid relative place-content-center h-10 w-10 rounded-full border border-black/[62]'>
                    <span className='absolute h-6 w-6 rounded-full border-2 border-white -right-2 text-sm -top-2 grid place-content-center bg-primary text-white font-bold'>2</span>
                    <Bell />
                </button>
            </div>
        </header>
    )
}

export default Header