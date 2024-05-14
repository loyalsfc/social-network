import { PostInterface } from '@/@types';
import { getBookmarks } from '@/app/action';
import Feeds from '@/components/main/feeds/feeds';
import { cn } from '@/lib/utils';
import React from 'react'

async function Page() {
    const bookmarks: PostInterface[] = await getBookmarks();
    return (
        <main className='w-full px-4 overflow-y-scroll h-full'>
            <div className={cn('h-full bg-white', !bookmarks.length ? "grid place-content-center" : "")}>
                <Feeds posts={bookmarks} emptyText='Your Bookmarks is Empty' />
            </div>
        </main>
    )
}

export default Page