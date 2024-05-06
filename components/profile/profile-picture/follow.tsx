import { Button } from '@/components/ui/button'
import { UserPlus2Icon } from 'lucide-react'
import React from 'react'

function Follow() {
    return (
        <Button className='flex items-center gap-2 bg-primary'><UserPlus2Icon/> Follow</Button>
    )
}

export default Follow