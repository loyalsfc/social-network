import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import Logo from '../logo/logo'
import Link from 'next/link'
import NotificationPopOver from './notification/notification'
import { NotificationInterface } from '@/@types'
import { endpointGetRequests } from '@/app/action'

async function Header() {
    const notifications:NotificationInterface[] = await endpointGetRequests("/notifications");

    return (
        <header className='bg-white py-2.5'>
            <div className='max-w-7xl mx-auto flex items-center justify-between gap-3'>
                <Link href={"/"}><Logo /></Link>

                <div className='w-full max-w-4xl rounded-full overflow-hidden relative'>
                    <Input className='w-full border border-black/15 h-11 rounded-full focus:border-primary' />
                    <button className='absolute grid place-content-center text-white rounded-full right-1 top-1 h-9 w-9 bg-primary'>
                        <Search />
                    </button>   
                </div>

                <NotificationPopOver notifications={notifications}/>
            </div>
        </header>
    )
}

export default Header