import React from 'react'
import Image from 'next/image'
import { Share2 } from 'lucide-react'
import Feeds from '@/components/main/feeds/feeds'
import { endpointGetRequests, getFollowInfo } from '@/app/action'
import Edit from '@/components/profile/edit-profile/edit'
import ProfilePicture from '@/components/profile/profile-picture/profile-picture'
import NotFound from '@/components/not-found/not-found'
import CoverPicture from '@/components/profile/cover-picture/cover-picture'
import { cookies } from 'next/headers'
import Follow from '@/components/profile/profile-picture/follow'
import { UserInterface } from '@/@types'
import Link from 'next/link'
import Media from '@/components/profile/media/media'

async function name(username: string) {
    return endpointGetRequests(`/user/${username}`)
}

async function Page({params}:{params: {username: string}}) {
    const user: UserInterface = await name(params.username)
    const defaultUser = JSON.parse(cookies().get('user-details')?.value ?? "");
    const followInfo = await getFollowInfo(user.id);
    const userPosts = await endpointGetRequests(`/user-posts/${params.username}`)
    
    //Check if the profile page is the user's page
    const isUserPage = defaultUser.username === params.username;

    return (
        <main className='w-full px-4 overflow-y-scroll h-full'>
            {!user?.id ? <div className='h-full grid place-content-center'>
                <NotFound/>
            </div>:<div className='relative'>
                <div className=' bg-gradient-to-l from-secondary/50 to-primary/50'>
                    {isUserPage ?
                     <CoverPicture /> : <div 
                            className='h-[189px] w-full bg-cover relative group'
                            style={{backgroundImage: `url("${user?.cover_picture}")`}}
                        >
                    
                        </div>
                    }
                </div>
                <div className='px-10 bg-white pb-8'>
                    <div className='flex items-end gap-6'>
                        {isUserPage ? <ProfilePicture /> : <div className='relative border-4 w-32 -mt-12 h-[118px] border-white rounded-md mr-auto group'>
                            <Image
                                src={user?.profile_picture ? user?.profile_picture : "/dummy.jpg"}
                                fill
                                alt='Profile image'
                                className='object-cover object-top'
                            />
                        </div>}
                        {!isUserPage && <Follow userToFollowId={user.id} />}
                        {isUserPage && <Edit/>}
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

                        <div className='flex gap-4'>
                            <Link 
                                href={`/${params.username}/following`} 
                                className='hover:underline font-medium'
                            >
                                {followInfo.following.length} following
                            </Link>
                            <Link 
                                href={`/${params.username}/followers`} 
                                className='hover:underline font-medium'
                            >
                                {followInfo.followers.length} followers
                            </Link>
                        </div>

                        <div>
                            <h5 className='text-dark text-xl font-medium mb-3'>About Me</h5>
                            <p className='font-thin text-black'>{user.bio}</p>
                        </div>
                    </article>
                </div>

                <section className='py-4 grid grid-cols-10 gap-4'>
                    <div className='col-span-6'>
                        <Feeds posts={userPosts} />
                    </div>
                    <div className="col-span-4">
                        <div className='bg-white p-4'>
                            <h4 className='text-dark text-xl font-medium mb-6'>Media</h4>
                            <Media post={userPosts} />
                        </div>
                    </div>
                </section>
            </div>}
        </main>
    )
}

export default Page