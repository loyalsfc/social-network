import { Button } from '@/components/ui/button'
import React from 'react'
import Stories from './stories/stories'

function StoriesReels() {
    return (
        <div>
            <div className='grid grid-cols-2 border-b border-b-grey'>
                <Button variant={"ghost"} className='reals-stories reals-stories-active'>Stories</Button>
                <Button variant={"ghost"} className='reals-stories'>Reels</Button>
            </div>
            <div>
                <Stories />
            </div>
        </div>
    )
}

export default StoriesReels