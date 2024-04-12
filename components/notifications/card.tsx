import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Star, VerifiedIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    image: string
    fullName: string,
    isVerified: boolean,
    username: string;
    date: Date;
    notificationText: string;
}

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function Card({
    image,
    fullName,
    isVerified,
    username,
    date,
    notificationText
}:Props) {
    return (
        <div className='bg-white border-l-2 px-6 py-4 border-l-secondary flex gap-3'>
            <div className='h-[50px] w-[50px] rounded-full relative'>
                <Image 
                    src={image}
                    fill
                    alt='Profile Image'
                    className='object-cover object-top rounded-full'
                />
                <span className='absolute left-1/2 -translate-x-1/2 -bottom-4 rounded-full h-9 w-9 border border-secondary bg-[#CFFFF5] grid place-content-center'>
                    <Star color='#00BD97'/>
                </span>
            </div>
            <article className='flex-1'>
                <div className='flex gap-2 items-center mb-2'>
                    <h4 className='font-medium text-lg text-[#06090C]'>{fullName}</h4>
                    {isVerified && <VerifiedIcon size={20} color='#40D89D' />}
                    <span>{username}</span>
                    -
                    <span>{timeAgo.format(date)}</span>
                </div>
                <p className='font-thin'>{notificationText}</p>
            </article>
        </div>
    )
}

export default Card