'use client'

import { CheckCheck, Clipboard, Ellipsis, EllipsisVertical, Mic, Paperclip, SendHorizonal, Smile, Video } from 'lucide-react';
import React, { useEffect } from 'react';
import dummyData from '@/data/dummy-data';
import dummyChat from '@/data/dummy-chat';
import Avatar from '../avatar/avatar';
import { cn } from '@/lib/utils';

const user = dummyData[2];

const username = "g_zaheer";

function ChartScreen() {
    useEffect(()=>{
        const scrollableColumn = document.getElementById('chat-container');
        scrollableColumn!.scrollTop = scrollableColumn?.scrollHeight ?? 0;
    },[])

    return (
        <div className='flex-1 flex flex-col h-full'>
            <header
                className='bg-white p-4 flex justify-between'
            >
                <div className='flex items-center gap-2'>
                    <Avatar
                        imageLink={user.profileImage}
                        size='52'
                        fullname={user.name}
                    />
                    <div className='flex-1'>
                        <h3 className='text-xl font-bold text-[#171C1B]'>{user.name}</h3>
                        <p className='flex items-center text-[#465352] gap-1.5'>
                            <span className='h-2 w-2 rounded-full bg-[#00B207]'/> 
                            Active Now
                        </p>
                    </div>
                </div>
                <button
                    className='h-8 w-8 rounded-full grid place-content-center border border-[#E3E8E7]'
                >
                    <Ellipsis color='#ACB9B8'/>
                </button>
            </header>
            <section className='pt-10 flex-1 overflow-y-scroll px-4' id='chat-container'>
                {dummyChat.map((item, index) => {
                    const isUser = item.sender.username === username 
                    return(
                        <div key={index}>
                            <div className={cn('w-full max-w-[388px]', isUser ? "ml-auto" : "")}>
                                <div className={cn('flex items-end gap-2', isUser && "flex-row-reverse")}>
                                    <Avatar
                                        size={"36"}
                                        imageLink={item.sender.profileImage}
                                    />
                                    <p 
                                        className={cn('flex-1 p-4 rounded-[2.5rem] text-sm font-medium', isUser ? "bg-secondary rounded-br-none text-white" : "bg-white rounded-bl-none text-black-100")}
                                    >
                                        {item.content}
                                    </p>
                                </div>
                                {item.isRead && 
                                    <p 
                                        className={cn('text-sm font-medium text-grey-100 flex items-center gap-1 w-fit', isUser ? "ml-auto mr-11" : "ml-11")}
                                    >
                                        {isUser && <CheckCheck/>} {new Date(item.timeRead ?? "").toLocaleTimeString()}
                                </p>}
                            </div>
                        </div>
                    )
                })}
            </section>
            <div className='px-4 pt-2'>
                <div className='bg-white rounded-3xl overflow-hidden'>
                    <textarea
                        className='block w-full focus:outline-none px-4 pt-2 pb-1 text-sm'
                    />
                    <div className='text-grey-100 flex items-center border-t border-t-[#E3E8E7] px-4 py-2.5'>
                        <div className='flex items-center gap-1 px-2'>
                            <button className='send-btns'>
                                <Video  size={20}/>
                            </button>
                            <button className='send-btns'>
                                <Mic  size={20}/>
                            </button>
                        </div>
                        <div className='flex items-center gap-1 border-x px-2 border-[#E3E8E7]'>
                            <button className='send-btns'>
                                <Smile  size={20}/>
                            </button>
                            <button className='send-btns'>
                                <Paperclip size={20}/>
                            </button>
                            <button className='send-btns'>
                                <Clipboard  size={20}/>
                            </button>
                        </div>
                        <button className='send-btns'>
                            <EllipsisVertical size={20}/>
                        </button>
                        <button className='ml-auto send-btns'>
                            <SendHorizonal color='#00BD97'  size={20}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartScreen