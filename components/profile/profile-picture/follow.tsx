"use client"

import { followUser } from '@/app/action'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { UserPlus2Icon } from 'lucide-react'
import React from 'react'
import Unfollow from './unfollow'
import { addToFollowing } from '@/lib/features/follow'
import { useRouter } from 'next/navigation'

function Follow({userToFollowId}:{userToFollowId: string}) {
    const {user} = useAppSelector(state => state.user);
    const {following} = useAppSelector(state => state.followList);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleFollow = async() => {
        if(!user?.id) return;
        const data = await followUser(user?.id, userToFollowId, "follow");
        if(!data?.error){
            router.refresh()
            dispatch(addToFollowing(userToFollowId));
        }
    }

    return (
        <Button 
            className='bg-primary'
        >
            {following.find(item => item === userToFollowId) ? 
                <Unfollow userToFollowId={userToFollowId} /> :
                <span onClick={handleFollow} className='flex items-center gap-2'>
                    <UserPlus2Icon/> Follow
                </span>
            }
        </Button>
    )
}

export default Follow