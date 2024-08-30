'use client'

import { PostInterface } from '@/@types';
import { followUser } from '@/app/action';
import EditPost from '@/components/post-view/modals/edit-post';
import EmbedPost from '@/components/post-view/modals/embed-post';
import PinPost from '@/components/post-view/modals/pin-post';
import PostCommentDelete from '@/components/post-view/modals/post-comment-delete';
import WhoCanCommentSettings from '@/components/post-view/modals/who-can-comment';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { addToFollowing, removeFromFollowing } from '@/lib/features/follow';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { Clock7, Code2Icon, Edit2Icon, Ellipsis, Flag, MessageSquare, PinIcon, Trash2, UserPlus2, UserRoundX, UserX2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify';

function DropMenu({
    post
}:{
    post: PostInterface
}) {
    const [showCommentDelete, setShowCommentDelete] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
    const [showEmbedPost, setShowEmbedPost] = useState(false);
    const [showWhoCanComment, setShowWhoCanComment] = useState(false);
    const [showPinPost, setShowPinPost] = useState(false);


    const {user} =useAppSelector(state => state.user);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                {post.username === user?.username ? <DropdownMenuContent>
                    <DropdownMenuItem 
                        className='flex gap-2 items-center font-medium text-red-500'
                        onClick={()=>setShowCommentDelete(true)}
                    >
                        <Trash2 /> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className='flex gap-2 items-center font-medium'
                        onClick={()=>setShowPinPost(true)}
                    >
                        <PinIcon /> Pin to profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        className='flex gap-2 items-center font-medium'
                        onClick={()=>setShowWhoCanComment(true)}
                    >
                        <MessageSquare/> Who can comment on this post
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className='flex gap-2 items-center font-medium'
                        onClick={()=>setShowEditPost(true)}
                    >
                        <Edit2Icon /> Edit post
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className='flex gap-2 items-center font-medium'
                        onClick={()=>setShowEmbedPost(true)}
                    >
                        <Code2Icon /> Embed Post
                    </DropdownMenuItem>
                </DropdownMenuContent>:<DropDownMenuOthersPost
                    post={post}
                    setShowEmbedPost={setShowEmbedPost}
                />}
            </DropdownMenu>
            {showCommentDelete && <PostCommentDelete
                id={post.id} 
                path='/post' 
                closeDelete={()=>setShowCommentDelete(false)}
            />}
            {showEditPost && <EditPost 
                post={post}
                closeEdit={()=>setShowEditPost(false)}
            />}
            {showEmbedPost && <EmbedPost
                postId={post.id}
                closeEdit={()=>setShowEmbedPost(false)}
            />}
            {showWhoCanComment && <WhoCanCommentSettings
                id={post.id}
                close={()=>setShowWhoCanComment(false)}
            />}
            {showPinPost && <PinPost
                id={post.id}
                close={()=>setShowPinPost(false)}
            />}
        </>

    )
}

function DropDownMenuOthersPost({
    post,
    setShowEmbedPost
}:{
    post: PostInterface,
    setShowEmbedPost: Dispatch<SetStateAction<boolean>>
}){
    const {following} = useAppSelector(state => state.followList);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user);

    const handleFollow = async() => {
        if(!user?.id) return;
        const data = await followUser(user?.id, post.user_id, "follow");
        if(!data?.error){
            router.refresh();
            toast.success("You have unfollowed this user",{
                position: "bottom-center"
            });
            dispatch(addToFollowing(post.user_id));
        }
        console.log(data?.error)
    }

    const handleUnfollow = async() => {
        if(!user?.id) return;
        const data = await followUser(user?.id, post.user_id, "unfollow");
        if(!data?.error){
            router.refresh();
            toast.success("You have unfollowed this user",{
                position: "bottom-center"
            });
            dispatch(removeFromFollowing(post.user_id));
        }
    }

    
    return(
        <DropdownMenuContent>
            <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                {following.find(item => item === post.user_id) ? 
                    <button className='flex gap-2 items-center' onClick={handleUnfollow}> 
                        <UserX2 /> Unfollow @{post.username} 
                    </button> : 
                        <button className='flex gap-2 items-center' onClick={handleFollow}> 
                            <UserPlus2 /> Follow @{post.username} 
                        </button>
                }
            </DropdownMenuItem>
            <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                <UserRoundX /> Block @{post.username}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex gap-2 items-center font-medium'>
                <Flag/> Report this post
            </DropdownMenuItem>
            <DropdownMenuItem className='flex gap-2 items-center font-medium text-red-500'>
                <Clock7 /> Snooze @{post.username} for 30 days
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
                className='flex gap-2 items-center font-medium'
                onClick={()=>setShowEmbedPost(true)}
            >
                <Code2Icon /> Embed Post
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

export default DropMenu