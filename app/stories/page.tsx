import { Image } from 'lucide-react'
import React from 'react'

function Page() {
  return (
    <div className='h-full w-full flex items-center  justify-center'>
        <div className='flex flex-col gap-3 items-center'>
            <div className=''>
                <Image size={120} className='shadow-md'/>
            </div>
            <h4 className='text-2xl font-semibold'>Select a story to open</h4>
        </div>
    </div>
  )
}

export default Page