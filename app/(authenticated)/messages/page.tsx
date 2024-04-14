import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import React from 'react'
import dummyChatlist from '@/data/dummy-chatlist'
import Card from '@/components/messages/card'
import ChartScreen from '@/components/messages/chart-screen'

function Page() {
    return (
        <main className="flex-1 h-full flex pl-6">
            <aside className='w-[371px] bg-white py-5 h-full overflow-y-scroll'>
                <div className="px-5 mb-2">
                    <h4 className='text-2xl font-bold mb-3 px-5'>Messages</h4>
                    <div className='relative mb-3'>
                        <Search className='absolute top-1/2 -translate-y-1/2 left-2' />
                        <Input
                            placeholder='Search for chats...'
                            className='rounded-full pl-8 focus:outline-primary focus:border-primary'
                        />
                    </div>
                    <Button className='bg-primary rounded-full w-full flex items-center justify-center gap-2'>
                        <Plus /> Start New Chat
                    </Button>
                </div>

                <div>
                    {dummyChatlist.map((item, index) => {

                        return(
                            <Card
                                key={index}
                                img={item.user.profileImage}
                                name={item.user.name}
                                snippet={item.snippet}
                                timestamp={item.timestamp}
                                isIncoming={item.isIncoming}
                                isRead={item.isRead}
                                unreadCount={item?.unreadCount}
                                isActive={index === 3 ? true : false}
                            />
                        )
                    })}
                </div>
            </aside>
            <ChartScreen />
        </main>

    )
}

export default Page