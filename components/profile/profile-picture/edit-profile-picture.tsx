"use client"

import React, { ChangeEvent, createRef, useState } from 'react'
import { ModalWrapper } from '@/components/modal/modal-wrapper'
import { changeProfilePicture } from '@/app/action'
import axios from 'axios'
import { useAppDispatch } from '@/lib/hook'
import { login } from '@/lib/features/user'
import RemoveProfilePicture from './remove-profile-picture'
import ShowProfilePicture from './show-profile-picture'
import { uploadImage } from '@/lib/utils'

function EditProfilePicture() {
    const dispatch = useAppDispatch();
    const [image, _SetImage] = useState("");
    const inputFileRef = createRef<HTMLInputElement>();
    const modalBtnRef = createRef<HTMLButtonElement>();

    const cleanUp = () => {
        URL.revokeObjectURL(image)
        if(inputFileRef?.current) inputFileRef.current.value = ""
    }

    const setImage = (newImage: string) => {
        if(image){
            cleanUp()
        }
        _SetImage(newImage)
    }

    const handleOnChange = async(event: ChangeEvent<HTMLInputElement>) => {
        const newImage = event.target.files![0]
        
        const data = await uploadImage(newImage);
        
        const url = data?.secure_url;
        const newProfile = await changeProfilePicture(url, "update-profile-image", "profile_image");
        dispatch(login(newProfile));
        modalBtnRef.current?.click();
    }

    return (
        <ModalWrapper 
            modalBtnRef={modalBtnRef}
            title='Edit Profile Picture' 
            btnText='' 
            className='h-full w-full bg-black/30 absolute top-0 left-0 hidden group-hover:block'
        >
            <ul>
                <li className='text-sm font-medium p-1.5 rounded-md cursor-pointer hover:bg-black/20'>
                    <ShowProfilePicture />
                </li>
                <li className='text-sm font-medium p-1.5 rounded-md cursor-pointer hover:bg-black/20'><label htmlFor="upload-profile-picture">Upload New Profile Picture</label></li>
                <input 
                    type="file" 
                    name="upload-profile-picture" 
                    id="upload-profile-picture" 
                    className='hidden'
                    ref={inputFileRef}
                    accept='image/*'
                    onChange={handleOnChange}
                />
                <li className='text-sm font-medium p-1.5 rounded-md cursor-pointer hover:bg-black/20'>
                    <RemoveProfilePicture />
                </li>
            </ul>
        </ModalWrapper>
    )
}

export default EditProfilePicture