import Image from 'next/image'
import React from 'react'

function ProfilePictureAvatar({
    size,
    link
}:{
    size: number
    link: string
}) {
    return (
        <div 
            className='relative rounded-full overflow-hidden shrink-0'
            style={{height: `${size}px`, width: `${size}px`}}
        >
            <Image
                src={link}
                fill
                alt='Profile Picture'
                className='object-cover object-top'
            />

        </div>
    )
}

export default ProfilePictureAvatar