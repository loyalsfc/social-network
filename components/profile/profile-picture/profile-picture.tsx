'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import dummyProfile from '../../../public/dummy.jpg'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import EditProfilePicture from './edit-profile-picture'

function ProfilePicture() {
    const {user} = useSelector(state => state.user)
    const [resource, setResource] = useState<string | CloudinaryUploadWidgetInfo | undefined>()
    console.log(resource)

    return (
        <div className='relative border-4 w-32 -mt-12 h-[118px] border-white rounded-md mr-auto group'>
            <Image
                src={user?.profile_picture ? user?.profile_picture : dummyProfile}
                fill
                alt='Profile image'
            />
            <div className='h-full w-full bg-black/30 hidden place-content-center group-hover:grid absolute top-0 left-0'>

 
            <CldUploadWidget
                options={{ sources: ['local'] }}
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(result, { widget }) => {
                    console.log(result)
                    setResource(result?.info);
                    widget.close();
                }}
                onError={(error)=>{
                    console.log(error);
                }}
            >
                {({ open }) => {
                    function handleOnClick() {
                        setResource(undefined);
                        open();
                    }
                    return (
                        <button onClick={handleOnClick}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
            </div>
        </div>
    )
}

export default ProfilePicture