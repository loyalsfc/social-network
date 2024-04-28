import React from 'react'
import { ModalWrapper } from '@/components/modal/modal-wrapper'


function EditProfilePicture() {
    return (
        <ModalWrapper title='Edit Profile Picture' btnText='' className='h-full w-full bg-black/30 absolute top-0 left-0 hidden group-hover:block'>
            <ul>
                <li className='text-sm font-medium p-1.5 rounded-md cursor-pointer hover:bg-black/20'>Show Profile Picture</li>
                <li className='text-sm font-medium p-1.5 rounded-md cursor-pointer hover:bg-black/20'><label htmlFor="upload-profile-picture">Upload New Profile Picture</label></li>
                <input type="file" name="upload-profile-picture" id="upload-profile-picture" className='hidden'/>
            </ul>
        </ModalWrapper>
    )
}

export default EditProfilePicture