import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    img:string;
    name:string;
    snippet:string;
    timestamp:string;
    isIncoming:boolean;
    isRead:boolean;
    unreadCount?: number;
    isActive?: boolean
}

function Card({
    img,
    name,
    snippet,
    timestamp,
    isIncoming,
    isRead,
    unreadCount,
    isActive
}:Props) {
    return (
        <div className={cn('flex py-4 border-b border-b-[#E3E8E7] last:border-b-0 cursor-pointer hover:bg-primary/10 px-5 relative', isActive ? "bg-[#E8F7F7] after:content-[''] after:absolute after:h-full after:bg-secondary after:w-1.5 after:left-0 after:top-0" : "")}>
            <div className='relative rounded-full overflow-hidden h-14 w-14'>
                <Image
                    src={img}
                    fill
                    alt='Profile image'
                />
            </div>
            <div className='flex-1 pl-4 pr-6'>
                <h4 className='font-bold text-[#171C1B]'>{name}</h4>
                <p className='text-sm text-[#465352] snippet-ellipsis'>{snippet}</p>
            </div>
            <div className='flex flex-col justify-between'>
                <span>{timestamp}</span>
                {isIncoming ? 
                    <>{!isRead && 
                        <span 
                            className='grid place-content-center text-white leading-none h-6 w-6 text-sm font-bold rounded-full bg-[#DD0000]'
                        >
                            {unreadCount}
                        </span>} 
                    </> : <CheckCheck color={isRead ? "#00BD97" : "#758A89"}/>}
            </div>
        </div>
    )
}

export default Card