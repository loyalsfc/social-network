import React from 'react'
import Card from './card'
import dummyData from '@/data/dummy-data'

function Suggestionbar() {
    return (
        <aside className='p-4 bg-white h-fit max-h-full overflow-y-scroll'>
            <h3 className='text-lg mb-4'>SUGGESTION</h3>
            <ul className='space-y-3'>
                {dummyData.map((item, index) => {
                    return <Card
                        key={index}
                        profileImage={item.profileImage}
                        background={item.background}
                        name={item.name}
                        username={item.username}
                    />
                })}
            </ul>
        </aside>
    )
}

export default Suggestionbar