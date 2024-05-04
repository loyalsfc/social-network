import { changeProfilePicture } from '@/app/action';
import { login } from '@/lib/features/user';
import { useAppDispatch } from '@/lib/hook';
import { uploadImage } from '@/lib/utils';
import { Camera } from 'lucide-react'
import React, { ChangeEvent } from 'react'

function EditCoverPicture() {
    const dispatch = useAppDispatch();

    const handleChange = async(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]

        if(!file) return;

        const data = await uploadImage(file);
        
        const url = data?.secure_url;
        console.log(url)
        if(url) {
            const newProfile = await changeProfilePicture(url, "update-cover-image", "cover_image");
            dispatch(login(newProfile));
        }

    }

    return (
        <div>
            <label
                htmlFor='upload-cover-image'
                className='h-10 w-10 grid place-content-center hover:bg-black/50 hover:text-white rounded-full'
            >
                <Camera/>
            </label>
            <input 
                type="file" 
                name="upload-cover-image" 
                id="upload-cover-image" 
                hidden 
                onChange={handleChange}
            />
        </div>
    )
}

export default EditCoverPicture