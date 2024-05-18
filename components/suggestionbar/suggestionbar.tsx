import React from 'react'
import Card from './card'
import dummyData from '@/data/dummy-data'
import { UserInterface } from '@/@types'
import { endpointGetRequests } from '@/app/action'

async function Suggestionbar() {
    const suggestedUsers: UserInterface[] = await endpointGetRequests('/suggested-users')
    return (
        <aside className='p-4 bg-white h-fit max-h-full overflow-y-scroll'>
            <h3 className='text-lg mb-4'>SUGGESTION</h3>
            <ul className='space-y-3'>
                {suggestedUsers.map((item, index) => {
                    return <Card
                        key={item.id}
                        id={item.id}
                        profileImage={item.profile_picture}
                        background={item.cover_picture}
                        name={item.name}
                        username={item.username}
                    />
                })}
            </ul>
        </aside>
    )
}

export default Suggestionbar