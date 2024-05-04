import React from 'react'
import dummyData from '@/data/dummy-data'
import Image from 'next/image'
import { Share2 } from 'lucide-react'
import Feeds from '@/components/main/feeds/feeds'
import { fetchUser } from '@/app/action'
import Edit from '@/components/profile/edit-profile/edit'
import ProfilePicture from '@/components/profile/profile-picture/profile-picture'
import NotFound from '@/components/not-found/not-found'
import CoverPicture from '@/components/profile/cover-picture/cover-picture'

async function name(username: string) {
    return fetchUser(username)
}

async function Page({params}:{params: {username: string}}) {
    const user = await name(params.username)
    
    return (
        <main className='w-full px-4 overflow-y-scroll h-full'>
            {user?.status ? <div className='h-full grid place-content-center'>
                <NotFound/>
            </div>:<div className='relative'>
                <CoverPicture />
                <div className='px-10 bg-white pb-8'>
                    <div className='flex items-end gap-6'>
                        <ProfilePicture username={params.username} />
                        <Edit username={params.username} />
                        <button className='profile-btn'>
                            <Share2 />
                        </button>
                    </div>
                    <article className='space-y-2'>
                        {/* <span className="text-secondary">online</span> */}
                        <h1 className='flex gap-4 items-center'>
                            <span className='text-dark text-2xl font-medium'>{user.name}</span>
                            <span className='text-[#263B42] font-thin text-lg'>@{user.username}</span>
                        </h1>
                        <h4>{user.profession}</h4>

                        <div>
                            <h5 className='text-dark text-xl font-medium mb-3'>About Me</h5>
                            <p className='font-thin text-black'>{user.bio}</p>
                        </div>
                    </article>
                </div>

                <section className='py-4 grid grid-cols-10 gap-4'>
                    <div className='col-span-6'>
                        <Feeds />
                    </div>
                    <div className="col-span-4">
                        <div className='bg-white p-4'>
                            <h4 className='text-dark text-xl font-medium mb-6'>My Media</h4>
                            <div className='grid grid-cols-2 gap-4'>
                                {dummyData.map((item, index)=>{
                                    return (
                                            <div key={index} className='relative w-full aspect-[157/114]'>
                                                <Image 
                                                    src={item.background} 
                                                    fill 
                                                    alt='Media' 
                                                    className='rounded-md'
                                                />
                                            </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>}
        </main>
    )
}

export default Page