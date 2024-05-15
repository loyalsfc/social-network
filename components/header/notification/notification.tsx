'use client'

import { NotificationInterface } from "@/@types"
import { endpointUpdateRequests } from "@/app/action"
import Card from "@/components/notifications/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Bell } from "lucide-react"
import { useState } from "react"

export default function NotificationPopOver({
    notifications
}:{
    notifications: NotificationInterface[] 
}) {
    const [unreads, setUnreads] = useState<number>(notifications.reduce((accumulator, currentValue) => accumulator + (currentValue.is_viewed ? 0 : 1), 0))
    async function markNotificationsAsRead() {
        const notificationsToMarkRead = notifications.map(item => {
            if(!item.is_viewed){
                return {
                    username: item.username, 
                    reference: item.reference,     
                    notifications_source: item.notification_source
                }
            }
        })

        if(notificationsToMarkRead.length){
            await endpointUpdateRequests("/update-notification", notificationsToMarkRead);
            setUnreads(0);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button 
                    className='grid relative place-content-center h-10 w-10 shrink-0 rounded-full border border-black/[62]'
                    onClick={markNotificationsAsRead}
                >
                    {unreads !== 0 && <span 
                        className='absolute h-6 w-6 rounded-full border-2 border-white -right-2 text-sm -top-2 grid place-content-center bg-primary text-white font-bold'
                    >
                        {unreads}
                    </span>}
                    <Bell />
                </button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-full max-w-lg bg-[#F1F1F1] max-h-96", notifications.length && "overflow-y-scroll")}>
                {notifications.length ? <div className="space-y-2">
                    {notifications.map(item => {
                        return <Card
                            key={item.id}
                            image={item.profile_picture}
                            fullName={item.name}
                            isVerified={item.is_verified}
                            username={item.username}
                            date={new Date(item.created_at)}
                            notificationText={item.content}
                            isRead={item.is_viewed}
                            reference={item.reference}
                            type={item.notification_source}
                        />
                    })}
                </div>:<div className="py-10 text-xl font-semibold text-center bg-white px-16">Notification is empty</div>}
            </PopoverContent>
        </Popover>
    )
}
