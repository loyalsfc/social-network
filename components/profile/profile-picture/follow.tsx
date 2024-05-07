"use client"

import { followUser } from '@/app/action'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { UserCheck2, UserPlus2Icon } from 'lucide-react'
import React from 'react'
import Unfollow from './unfollow'

function Follow({userToFollowId}:{userToFollowId: string}) {
    const {user} = useAppSelector(state => state.user);
    const {following, followers} = useAppSelector(state => state.followList);
    const dispatch = useAppDispatch();

    const handleFollow = async() => {
        if(!user?.id) return;
        const data = await followUser(user?.id, userToFollowId, "follow");
        console.log(data)
    }
    console.log(following);
    // console.log(followers)
    return (
        <Button 
            className='bg-primary'
        >
            {!following.find(item => item === userToFollowId) ? 
                <span onClick={handleFollow} className='flex items-center gap-2'>
                    <UserPlus2Icon/> Follow
                </span> :
            <Unfollow userToFollowId={userToFollowId} /> 
            }
        </Button>
    )
}

export default Follow