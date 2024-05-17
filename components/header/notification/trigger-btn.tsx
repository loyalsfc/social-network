'use client'

import { NotificationInterface } from '@/@types';
import { endpointUpdateRequests } from '@/app/action';
import { Bell } from 'lucide-react';
import React, { useState } from 'react'

function TriggerBtn({ notifications
}:{
    notifications: NotificationInterface[] 
}) { 
    const [unreads, setUnreads] = useState<number>(notifications?.reduce((accumulator, currentValue) => accumulator + (currentValue.is_viewed ? 0 : 1), 0))

    async function markNotificationsAsRead() {
        const notificationsToMarkRead = notifications?.map(item => {
            if(!item.is_viewed){
                return {
                    username: item.username, 
                    reference: item.reference,     
                    notifications_source: item.notification_source
                }
            }
        })

        if(notificationsToMarkRead?.length){
            await endpointUpdateRequests("/update-notification", notificationsToMarkRead);
            setUnreads(0);
        }
    }
    return (
        <button 
            className='grid relative place-content-center h-10 w-10 shrink-0 rounded-full border border-black/[62]'
            onClick={markNotificationsAsRead}
        >
            {unreads !==0 &&  <span 
                className='absolute h-6 w-6 rounded-full border-2 border-white -right-2 text-sm -top-2 grid place-content-center bg-primary text-white font-bold'
            >
                {unreads}
            </span>}
            <Bell />
        </button>
    )
}

export default TriggerBtn