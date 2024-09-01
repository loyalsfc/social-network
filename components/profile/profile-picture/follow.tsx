"use client"

import { endpointPostRequests, followUser } from '@/app/action'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { UserPlus2Icon } from 'lucide-react'
import React from 'react'
import Unfollow from './unfollow'
import { addToFollowing } from '@/lib/features/follow'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { removeBlocks } from '@/lib/features/block'

function Follow({userToFollowId}:{userToFollowId: string}) {
    const {user} = useAppSelector(state => state.user);
    const {following} = useAppSelector(state => state.followList);
    const {blocks} = useAppSelector(state => state.block);
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

    const unblock = async() => {
        const data = await endpointPostRequests("/unblock", {
            blocker_id: user?.id,
            blocked_id: userToFollowId
        })
        if(!data?.error){
            router.refresh();
            toast.error("You unblock this user",{
                position: "bottom-center"
            });
            dispatch(removeBlocks(userToFollowId));
        }
    }

    return (
        <>
            {blocks.find(item => item === userToFollowId) ?
                <Button 
                    className='bg-red-500 hover:bg-red-500'
                    onMouseEnter={(e) => e.currentTarget.textContent = "Unblocked"}
                    onMouseLeave={(e) => e.currentTarget.textContent = "Blocked"}
                    onClick={unblock}
                >
                    Blocked
                </Button> :
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
            }
        </>
    )
}

export default Follow