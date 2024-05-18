import { Media, PostInterface } from '@/@types'
import { endpointPostRequests } from '@/app/action'
import { ModalWrapper } from '@/components/modal/modal-wrapper'
import { CalendarClock, ForwardIcon, ImageIcon, Smile, VerifiedIcon, Video } from 'lucide-react'
import React, { createRef, useState } from 'react'
import Link from 'next/link'
import { cn, handleImageUpload } from '@/lib/utils'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { useAppSelector } from '@/lib/hook'
import { Button } from '@/components/ui/button'

function SharePost({post}:{post: PostInterface}) {
    const ref = createRef<HTMLButtonElement>()
    const [successNotification, setSuccessNotification] = useState({
        postID: "",
        isShown: false
    })
    const [blobs, setBlobs] = useState<Media[]>([]);
    const [postContent, setPostContent] = useState<string>("");

    const {user} = useAppSelector(state => state.user);
    const {
        id,
        profile_picture: profilePicture,
        name,
        username,
        created_at: date,
        content: caption,
        media,
        is_verified: isVerified,
    } = post;

    const publishPost = async() => {
        const data = {
            user_id: user?.id,
            content: postContent,
            media: blobs,
            is_shared: true,
            shared_post_id: id
        }
        const post = await endpointPostRequests("/new-post", data);
        if(!post.error){
            ref.current?.click();
            setBlobs([]);
            setPostContent("");
            setSuccessNotification({
                postID: post.id,
                isShown: true
            })
            
            setTimeout(()=>{
                setSuccessNotification({
                    postID: '',
                    isShown: false
                })
            },5000)
        };
    }

    return (
        <ModalWrapper
            btnText="Share"
            Icon={ForwardIcon}
            title=""
            className='border py-1.5 px-3 rounded-md hover:bg-gray-100 border-[#4E6876] flex items-center gap-2 ml-auto'
            size='sm:max-w-[525px]'
            modalBtnRef={ref}
        >
            <div>
                <div className=''>
                    <div className='flex items-center gap-2'>
                        <ProfilePictureAvatar link={user?.profile_picture ?? "/dummy.jpeg"} size={40}/>
                        <div>
                            <h4 className='font-medium leading-none text-[#06090C] flex gap-1 items-center'>
                                {user?.name}
                                {user?.is_verified && <VerifiedIcon size={20} color='#40D89D' />} 
                            </h4>
                            <span className='text-[#263B42] leading-none'>@{user?.username} </span>
                        </div>
                    </div>
                    <textarea 
                        className='block w-full focus:outline-none resize-none py-2 px-1' 
                        rows={2}
                        placeholder='Say something about this'
                        value={postContent}
                        onChange={(e)=>setPostContent(e.target.value)}
                    />
                </div>
                <article className=''>
                    <div className='block bg-white py-2 border border-dark rounded-3xl p-2'>
                        <div className='flex items-center gap-2 text-[#263B42]'>
                            <ProfilePictureAvatar link={profilePicture} size={40}/>
                            <div>
                                <h4 className='font-medium leading-none text-[#06090C] flex items-center gap-1'>{name} {isVerified && <VerifiedIcon size={20} color='#40D89D' />} </h4>
                                <span className='text-[#263B42] leading-none'>@{username} </span>
                            </div>
                        </div>
                        <div
                            className={cn(media?.length ? ' text-black' : "pt-4")}
                        >
                            {caption}
                        </div>
                        {/* {media && media?.length > 0 && <CardImages media={media}/>} */}
                    </div>
                </article>
                <div className='flex justify-between items-center pt-4'>
                    <div className='flex gap-4 items-center'>
                        <div>
                            <label htmlFor='upload-image' className='text-black/60 hover:scale-105 transition-all'>
                                <ImageIcon/>
                            </label>
                            <input 
                                onChange={(e)=>handleImageUpload(e, "image", setBlobs)} 
                                type="file" 
                                name="upload-image" 
                                id="upload-image" 
                                hidden 
                                accept='image/*' 
                                multiple
                            />
                        </div>
                        <div>
                            <label htmlFor='upload-video' className='text-black/60 hover:scale-105 transition-all'>
                                <Video/>
                            </label>
                            <input 
                                onChange={(e)=>handleImageUpload(e, "video", setBlobs)} 
                                type="file" 
                                name="upload-video" 
                                id="upload-video" 
                                hidden 
                                accept='video/*' 
                                multiple
                            />
                        </div>
                        <button className='text-black/60 hover:scale-105 transition-all'>
                            <Smile/>
                        </button>
                        <button className='text-black/60 hover:scale-105 transition-all'>
                            <CalendarClock />
                        </button>
                    </div>
                    <Button 
                        className='bg-secondary shadow-2xl text-white hover:opacity-85 transition-all'
                        disabled = {postContent === "" && blobs.length === 0}
                        onClick={publishPost}
                    >
                        Share Post
                    </Button>
                </div>

                {successNotification.isShown && <div className='fixed bottom-10 left-1/2 -translate-x-1/2 rounded py-2 px-4 bg-secondary'>
                <span className='text-center text-white text-sm font-semibold'>
                    Post Successful <Link className='hover:underline' href={`/post/${successNotification.postID}`}>See post</Link>
                </span>
            </div>}
            </div>
        </ModalWrapper>
    )
}

export default SharePost