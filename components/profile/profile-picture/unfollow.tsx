import { followUser } from '@/app/action'
import { ModalWrapper } from '@/components/modal/modal-wrapper'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/lib/hook'
import { UserCheck2 } from 'lucide-react'
import React, { createRef } from 'react'

function Unfollow({userToFollowId}:{userToFollowId: string}) {
    const {user} = useAppSelector(state => state.user)
    const ref = createRef<HTMLButtonElement>()

    const handleUnfollow = async() => {
        if(!user?.id) return;
        closeModal()
        const data = await followUser(user?.id, userToFollowId, "unfollow");
        console.log(data)
    }

    const closeModal = () => {
        ref.current?.click();
    }

    return (
        <ModalWrapper
            title=''
            Icon={UserCheck2}
            btnText='Following'
            className='flex items-center gap-2 h-full w-full'
            size='sm:max-w-[325px]'
            modalBtnRef={ref}
        >
            <div className='flex flex-col gap-3'>
                <Button onClick={handleUnfollow} className='bg-red-500'>
                    Unfollow
                </Button>
                <Button onClick={closeModal}>
                    Cancel
                </Button>
            </div>
        </ModalWrapper>
    )
}

export default Unfollow