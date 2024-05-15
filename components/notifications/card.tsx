import { cn } from '@/lib/utils'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { MessageCircle, Star, User2Icon, VerifiedIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface Props {
    image: string
    fullName: string,
    isVerified: boolean,
    username: string;
    date: Date;
    notificationText: string;
    isRead: boolean;
    reference: string;
    type: "likes" | "comments" | "follow";
}

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function Card({
    image,
    fullName,
    isVerified,
    username,
    date,
    notificationText,
    isRead,
    reference,
    type
}:Props) {

    function notificationContent(content: string){
        let wordSplit = content.split(" ");
        const username = wordSplit.shift()
        return(
            <p className='gap-1'>
                <span className='hover:underline text-secondary pr-1'>{username}</span>
                <span>{wordSplit.join(" ")}</span>
            </p>
        )
    }

    return (
        <div className={cn('bg-white border-l-2 px-6 py-4 border-l-secondary flex gap-3')}>
            <div className='h-[50px] w-[50px] rounded-full relative'>
                <Image 
                    src={image}
                    fill
                    alt='Profile Image'
                    className='object-cover object-top rounded-full'
                />
                <span className='absolute left-1/2 -translate-x-1/2 -bottom-4 rounded-full h-9 w-9 border border-secondary bg-[#CFFFF5] grid place-content-center'>
                    {type === "likes" 
                        ? <Star color='#00BD97'/> 
                        : type === "comments" 
                        ? <MessageCircle color='#00BD97' /> 
                        : <User2Icon color='#00BD97' />
                    }
                </span>
            </div>
            <article className='flex-1'>
                <div className='flex gap-2 items-center mb-2'>
                    <h4 className='font-medium text-lg text-[#06090C]'>{fullName}</h4>
                    {isVerified && <VerifiedIcon size={20} color='#40D89D' />}
                    <span className='text-[#263B42]'>@{username}</span>
                    -
                    <span>{timeAgo.format(date, "mini")}</span>
                    {!isRead && <div className='h-4 w-4 rounded-full bg-blue-400 ml-auto' />}
                </div>
                {(type === "likes" || type === "comments") ? <Link href={`/post/${reference}`}>
                    <div className='font-thin'>{notificationContent(notificationText)}</div>
                </Link> : <Link href={`/$${reference}`}>
                    <div className='font-thin mb-1'>{notificationContent(notificationText)}</div>
                    <Button className='bg-secondary'>Follow Back</Button>
                </Link>}
            </article>
        </div>
    )
}

export default Card