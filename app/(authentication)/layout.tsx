import Image from 'next/image'
import React, { ReactNode } from 'react'
import authImage from "../../public/authentications.png"
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

function AuthLayout({
    children
}:{
    children: ReactNode
}) {
    console.log("cookies", cookies().get('access-token')?.value)
    if(cookies().get('access-token')?.value){
        redirect("/")
    }
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