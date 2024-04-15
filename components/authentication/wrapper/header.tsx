import Logo from '@/components/logo/logo'
import Link from 'next/link';
import React from 'react'
import SocialBtn from '../button/social-btn';

interface Props {
    headertext: string,
    headerLink: string,
    headerLinkText: string,
    title: string,
    note: string
}

function AuthWrapper({
    headertext,
    headerLink,
    headerLinkText,
    title,
    note,
}: Props) {
    return (
        <div className='text-black'>
            <header className='flex justify-between items-center px-8 py-4'>
                <Logo />
                <span className='flex gap-1 items-center text-sm font-light'>
                    {headertext} 
                    <Link 
                        href={headerLink} 
                        className='text-secondary hover:underline font-medium'
                    >
                         {headerLinkText}
                    </Link>
                </span>
            </header>
            <div className='text-center'>
                <h3 className='text-4xl font-semibold'>{title}</h3>
                <p className='text-lg'>{note}</p>

                <div className='flex items-center justify-center gap-10 py-8'>
                    <SocialBtn
                        link='/google.svg'
                        name='Google'
                    />
                    <SocialBtn
                        link='/facebook.svg'
                        name='Facebook'
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper