import Image from 'next/image'
import React from 'react'

function SocialBtn({
    link, 
    name
}:{
    link: string;
    name: string;
}) {
    return (
        <button className='border border-[#DEDEDE] gap-4 flex items-center rounded-[5px] bg-white px-8 py-2 hover:border-secondary'>
            <Image
                src={link}
                height={24}
                width={24}
                alt='Social Logo'
            />
            {name}
        </button>
    )
}

export default SocialBtn