import React from 'react'
import dummyData from '@/data/dummy-data'
import Image from 'next/image'
import { Edit2, Share2 } from 'lucide-react'
import Link from 'next/link'
import Feeds from '@/components/main/feeds/feeds'
const user = dummyData[0]

function Page() {
    return (
        <main className='w-full px-4 overflow-y-scroll h-full'>
            <div className='relative'>
                <div 
                    className='h-[189px] w-full bg-cover'
                    style={{backgroundImage: `url('${user.background}')`}}
                />
                <div className='px-10 bg-white pb-8'>
                    <div className='flex items-end gap-6'>
                        <div className='relative border-4 w-32 -mt-12 h-[118px] border-white rounded-md'>
                            <Image
                                src={user.profileImage}
                                fill
                                alt='Profile image'
                            />
                        </div>
                        <Link href={"/profile/edit"} className='profile-btn ml-auto'>
                            <Edit2 />
                        </Link>
                        <button className='profile-btn'>
                            <Share2 />
                        </button>
                    </div>
                    <article className='space-y-2'>
                        <span className="text-secondary">online</span>
                        <h1 className='flex gap-4 items-center'>
                            <span className='text-dark text-2xl font-medium'>{user.name}</span>
                            <span className='text-[#263B42] font-thin text-lg'>@{user.username}</span>
                        </h1>
                        <h4>UI/UX Designer</h4>

                        <div>
                            <h5 className='text-dark text-xl font-medium mb-3'>About Me</h5>
                            <p className='font-thin text-black'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
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
            </div>
        </main>
    )
}

export default Page