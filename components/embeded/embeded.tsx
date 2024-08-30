import { PostInterface } from '@/@types';
import { cn, timeAgo } from '@/lib/utils';
import { Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CardImages from '../main/feeds/post-cards/card-images';

function Embeded({post}:{post: PostInterface}) {
    return (
        <main className="w-full">
            <div className="">
                <div className='bg-white border relative rounded'>

                    <div className={cn('flex items-center p-2 gap-2', post.media.length === 1 && 'absolute top-0 left-0 z-10 w-full')}>
                        <Link href={"/"+post.username} className='h-12 w-12 relative border-2 border-white block'>
                            <Image
                                src={post.profile_picture}
                                fill
                                alt='User profile picture'
                                className='object-cover object-top'
                            />
                        </Link>
                        <article className={cn(post.media.length === 1 && 'text-white')}>
                            <h4 className='leading-none font-semibold'>@{post.username}</h4>
                            <span className='text-xs leading-tight font-medium'>About {timeAgo.format(new Date(post.created_at))}</span>
                        </article>
                        <Image
                            src={"/logo.png"}
                            height={40}
                            width={40}
                            alt='Fledge logo'
                            className='object-contain object-center ml-auto grayscale'
                        />
                    </div>

                    {post.media.length === 1 && <div>
                        {post.media[0].mediaType === "image" ?
                        <div className='relative h-96'>
                        <Image
                            src={post.media[0].url}
                            fill
                            alt='Media'
                            className='object-cover'
                        />
                        </div>
                         : <video src={post.media[0].url} controls />}
                    </div>}

                    <div className=''>
                        <p className='px-2 py-3'>{post.content}</p>
                        {post.media.length > 1 && <CardImages postId={post.id} media={post.media}/>}
                        <div className={cn('px-2', post.media.length > 1 && "mt-3")}>
                            <div className='flex gap-3 py-3 border-t'>
                                <Link href={"/post/" + post.id} className='reaction-btn'>
                                    <Heart size={20}/>
                                    <span className={cn(post.likes_count === 0 ? "invisible" : "visible")}>{post.likes_count}</span>
                                </Link>
                                <Link href={"/post/" + post.id} className='reaction-btn'>
                                    <MessageSquare size={20} className='hover:scale-110 transition-all' />
                                    <span className={cn(post.comments_count === 0 ? "invisible" : "visible")}>{post.comments_count}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Embeded