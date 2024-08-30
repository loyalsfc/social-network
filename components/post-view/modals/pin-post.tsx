import React, { useState } from 'react'
import { Button } from '../../ui/button'

interface Props{
    id: string;
    close: ()=>void;
}

function PinPost({id, close,}:Props) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className='fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center'>
            <div onClick={close} className="absolute h-full w-full bg-black/30"/>
            <div className='flex flex-col bg-white w-full max-w-sm shrink-0 z-50 p-8 rounded-xl shadow'>
                <article className='text-center pb-4'>
                    <h4 className='text-xl font-medium mb-2'>Pin Post</h4>
                    <p>Pin this post to the top of your page</p>
                </article>
                <div className='flex flex-col gap-3'>
                    <Button 
                        disabled={isLoading}
                    >
                        {isLoading ? <span className='h-4 w-4 rounded-full border-white border-t-gray-700 border-2 animate-spin' /> : "Pin"}
                    </Button>
                    <Button 
                        onClick={close}
                        className='bg-red-500' 
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PinPost