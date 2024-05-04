import { changeProfilePicture } from '@/app/action'
import { ModalWrapper } from '@/components/modal/modal-wrapper'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/features/user'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { X } from 'lucide-react'
import React, { createRef } from 'react'

function RemoveProfilePicture() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user)
    const ref = createRef<HTMLButtonElement>()

    const close = () => {
        ref.current?.click()
    }

    const remove = async(event: any) => {
        event.target.disabled = true;
        const newProfile = await changeProfilePicture("", "update-profile-image", "profile_image");
        dispatch(login(newProfile));
        event.target.disabled = false;
        close();
    }

    return (
        <ModalWrapper
            modalBtnRef={ref}
            title='Remove Profile Picture'
            btnText='Remove Profile Picture'
        >
            <h3>Are you sure you want to remove your profile photo?</h3>
            <div className='flex justify-end gap-4 pt-8'>
                <Button onClick={close} variant={"ghost"} className='text-secondary'>Cancel</Button>
                <Button 
                    className='bg-secondary font-medium disabled:bg-gray-500'
                    onClick={remove}
                >
                    Confirm
                </Button>
            </div>
        </ModalWrapper>
    )
}

export default RemoveProfilePicture