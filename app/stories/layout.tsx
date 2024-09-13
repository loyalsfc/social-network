import { Plus, X } from 'lucide-react';
import React, { ReactNode } from 'react';
import dummyData from '@/data/dummy-data'
import StoryCard from './_components/card/story-card';
import Image from 'next/image';
import Logo from '@/components/logo/logo';
import Link from 'next/link';

function Layout({children}:{children: ReactNode}) {
  return (
    <div className='h-screen overflow-hidden flex'>
        <aside className='pt-4 w-80 bg-grey/30 h-full overflow-hidden flex flex-col'>
            <div className='flex items-center gap-3 px-3 pb-3'>
                <Link href={"/"}>
                    <X size={32} />
                </Link>
                <Logo hideText />
            </div>
            <div className='flex-1 overflow-y-scroll'>
                <div className='text-2xl px-3 pb-4 font-bold'>Story</div>
                <div className='px-3 pb-5'>
                    <h4 className='text-xl font-semibold mb-2'>Your Stories</h4>
                    <div className='flex items-center gap-3'>
                        <button className='h-14 w-14 rounded-full grid place-content-center bg-grey-100/30'>
                            <Plus />
                        </button>
                        <div>
                            <h4>Create a Story</h4>
                            <p className='text-sm text-grey-100'>Share a photo or video</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className='text-xl font-semibold mb-1 px-3'>All Stories</h4>
                    <ul className='px-1'>
                        {dummyData.map((item, index) => {
                            return(
                                <StoryCard 
                                    key={index}
                                    username={item.name}
                                    profile_picture={item.profileImage}
                                    newCount={Math.ceil(Math.random() * 20)}
                                    time='2024-09-20'
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </aside>
        <main className='h-full flex-1'>{children}</main>
    </div>
  )
}

export default Layout