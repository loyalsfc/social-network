import Image from 'next/image'
import React from 'react'

function Logo({
    hideText
}:{
    hideText?: boolean
}) {
    return (
        <div className='flex items-center gap-2'>
            <div className='w-[70px] h-[54px] relative'>
                <Image
                    src="/logo.png"
                    fill
                    alt="Fledge logo"
                />
            </div>
            {!hideText && <span className='text-[#340E0E] font-bold'>Fledge</span>}
        </div>
    )
}

export default Logo