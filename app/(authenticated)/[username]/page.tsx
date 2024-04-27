import React from 'react'
import dummyData from '@/data/dummy-data'
import Image from 'next/image'
import { Edit2, Share2 } from 'lucide-react'
import Link from 'next/link'
import Feeds from '@/components/main/feeds/feeds'
import { cookies } from 'next/headers'
import { UserInterface } from '@/@types'
import  dummyProfile from '../../../public/dummy.jpg'
import { fetchUser } from '@/app/action'

async function name(username: string) {
    return fetchUser(username)
}

async function Page({params}:{params: {username: string}}) {
    const user2 = await name(params.username)
    console.log(user2)
    const user:UserInterface = JSON.parse(cookies().get("user-details")?.value ?? "")
    return (
        <main className='w-full px-4 overflow-y-scroll h-full'>
            <div className='relative'>
                <div 
                    className='h-[189px] w-full bg-cover'
                    style={{backgroundImage: `url('${user.cover_picture ? user.cover_picture : "https://images.pexels.com/photos/5109665/pexels-photo-5109665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}')`}}
                />
                <div className='px-10 bg-white pb-8'>
                    <div className='flex items-end gap-6'>
                        <div className='relative border-4 w-32 -mt-12 h-[118px] border-white rounded-md'>
                            <Image
                                src={user.profile_picture ? user.profile_picture : dummyProfile}
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
            </div>
        </main>
    )
}

export default Page