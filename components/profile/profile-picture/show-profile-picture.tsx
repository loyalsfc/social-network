import { ModalWrapper } from '@/components/modal/modal-wrapper'
import { useAppSelector } from '@/lib/hook'
import Image from 'next/image'
import React, { createRef } from 'react'
import dummyProfile from '../../../public/dummy.jpg'

function ShowProfilePicture() {
    const {user} = useAppSelector(state => state.user)
    const ref = createRef<HTMLButtonElement>()

    const close = () => {
        ref.current?.click()
    }

    return (
        <ModalWrapper
            modalBtnRef={ref}
            title=''
            btnText='Show Profile Picture'
        >
            <div className=' h-72 w-72 relative mx-auto'>
                <Image
                    src={user?.profile_picture ? user?.profile_picture : dummyProfile}
                    fill
                    alt={`${user?.name} profile image`}
                    className=' object-cover object-top'
                />
            </div>
        </ModalWrapper>
    )
}

export default ShowProfilePicture