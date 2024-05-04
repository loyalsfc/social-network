"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function NotFound() {
    const router = useRouter()
    return (
        <div className='flex flex-col items-center gap-3'>
            <Image
                src={"/not-found.svg"}
                alt='Not found'
                height={250}
                width={250}
            />
            <p 
                className='max-w-md text-center font-medium'
            >
                This content isn't available right now
                When this happens, it's usually because the owner only shared it with a small group of people, changed who can see it or it's been deleted.
            </p>
            <Link
                href={"/"}
            >
                <Button className='bg-primary text-white font-medium'>Go to News Feed</Button>
            </Link>
            <Button 
                variant={"ghost"}
                className='text-secondary'
                onClick={()=>router.back()}
            >
                Go Back
            </Button>

        </div>
    )
}

export default NotFound