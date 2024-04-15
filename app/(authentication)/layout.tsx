import Image from 'next/image'
import React, { ReactNode } from 'react'
import authImage from "../../public/authentication.png"
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils';

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

function AuthLayout({
    children
}:{
    children: ReactNode
}) {
    return (
        <div className={cn(poppins.className, 'grid grid-cols-12 w-full h-screen')}>
            <main className=' col-span-7'>
                {children}
            </main>
            <div className='relative col-span-5'>
                <Image
                    src={authImage}
                    fill
                    alt='Authentication image'
                    className='object-cover'
                />
            </div>
        </div>
    )
}

export default AuthLayout