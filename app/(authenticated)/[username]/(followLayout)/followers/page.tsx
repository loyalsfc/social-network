import { UserInterface } from '@/@types'
import { fetchUser, getFollowers } from '@/app/action'
import FollowList from '@/components/profile/follow/follow-list'
import { redirect } from 'next/navigation'
import React from 'react'

async function Page({params}:{params:{username: string}}) {
    const user: UserInterface = await fetchUser(params.username)
    
    if(!user.id) {
        redirect(`/$${params.username}`)
    }

    const followers: UserInterface[] = await getFollowers(user.id);

    return (
        <FollowList followers={followers} title='Following' />
    )
}

export default Page