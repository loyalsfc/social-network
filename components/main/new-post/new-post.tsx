import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BarChartHorizontal, CalendarClock, Image, Smile, Video } from 'lucide-react'
import React from 'react'

function NewPost() {
    return (
        <div className='border-b border-b-grey p-4'>
            <Textarea 
                className='font-thin text-lg border-none mb-2 focus:outline-none focus:outline-transparent focus:outline-0 focus:border-none'
                placeholder="What's Happening?"
            />
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <Image/>
                    </button>
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <Video/>
                    </button>
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <BarChartHorizontal />
                    </button>
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <Smile/>
                    </button>
                    <button className='text-black/60 hover:scale-105 transition-all'>
                        <CalendarClock />
                    </button>
                </div>
                <Button className='bg-secondary shadow-2xl text-white hover:opacity-85 transition-all'>Publish Post</Button>
            </div>
        </div>
    )
}

export default NewPost