import { UserInterface } from "@/@types"
import { endpointGetRequests, getFollowInfo } from "@/app/action"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { VerifiedIcon } from "lucide-react"
import Link from "next/link"
import ProfilePictureAvatar from "../profile-picture-avatar/profile-picture-avatar"
import Follow from "../profile/profile-picture/follow"
import { cn } from "@/lib/utils"

export async function ProfileHoverCard({
    hoverText,
    textClassName,
    username
}:{
    hoverText?: string,
    textClassName: string,
    username: string
}) {
    const user: UserInterface = await endpointGetRequests(`/user/${username.replace("@", "")}`)
    if(!user.id) return;
    const followInfo = await getFollowInfo(user.id);
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={`/${username}`} className={cn('hover:underline',textClassName)}>{hoverText ?? username}</Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="">
                    <div>
                        <div className="flex items-center justify-between">
                            <ProfilePictureAvatar
                                link={user.profile_picture}
                                size={50}
                            />
                            <Follow userToFollowId={user.id} />
                        </div>
                        <div className="flex gap-2 items-center">
                            <Link 
                                href={`/${user.username}`} 
                                className="font-medium text-lg text-[#06090C] hover:underline"
                            >
                                {user.name}
                            </Link>
                            {user.is_verified && <VerifiedIcon size={20} color='#40D89D' />}
                        </div>
                        <Link 
                            href={`/${user.username}`} 
                            className="text-[#263B42]"
                        >
                            {`@${user.username}`}
                        </Link>
                    </div>
                        <p className="text-sm py-1">
                            {user.bio}
                        </p>
                        <div className='flex gap-4 py-1'>
                            <Link 
                                href={`/${user.username}/following`} 
                                className='hover:underline font-medium'
                            >
                                {followInfo.following.length} following
                            </Link>
                            <Link 
                                href={`/${user.username}/followers`} 
                                className='hover:underline font-medium'
                            >
                                {followInfo.followers.length} followers
                            </Link>
                        </div>
                    </div>
            </HoverCardContent>
        </HoverCard>
    )
}
