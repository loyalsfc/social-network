import React from 'react'
import dummyData from '@/data/dummy-data'
import Card from './card'


function Stories() {
    return (
        <div>
            <div className='flex gap-6 p-6'>
                {dummyData.map((item, index) => {
                    return <Card 
                        key={index} 
                        profileImage={item.profileImage} 
                        name={item.name}
                    />
                })}
            </div>
        </div>
    )
}

export default Stories