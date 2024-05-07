import Suggestionbar from '@/components/suggestionbar/suggestionbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import FollowLink from '@/components/profile/follow/follow-link';

async function Layout({
    children, params
}:{
    children: ReactNode,
    params: {username: string}
}) {
    return (
        <main className='w-full px-4 overflow-y-hidden h-full flex gap-4'>
            <div className='flex-1 bg-white py-4'>
                <div className='flex items-center gap-4 px-4'>
                    <Link href={`/${params.username}`}>
                        <ArrowLeft />
                    </Link>
                    <span className='text-2xl font-medium'>@{params.username}</span>
                </div>
                <div className='grid grid-cols-3 text-center pt-5 font-semibold border-b px-4'>
                    <FollowLink
                        text='Mutual Followers'
                        link={`mutual-followers`}
                    />
                    <FollowLink
                        text='Followers'
                        link={`followers`}
                    />
                    <FollowLink
                        text='Following'
                        link={`following`}
                    />
                </div>
                {children}
            </div>
            <Suggestionbar />
        </main>
    )
}

export default Layout