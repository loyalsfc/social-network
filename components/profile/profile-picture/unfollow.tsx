import { followUser } from '@/app/action'
import { ModalWrapper } from '@/components/modal/modal-wrapper'
import { Button } from '@/components/ui/button'
import { removeFromFollowing } from '@/lib/features/follow'
import { useAppSelector } from '@/lib/hook'
import { UserCheck2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { createRef } from 'react'
import { useDispatch } from 'react-redux'

function Unfollow({userToFollowId}:{userToFollowId: string}) {
    const {user} = useAppSelector(state => state.user);
    const ref = createRef<HTMLButtonElement>();
    const dispatch = useDispatch();
    const router = useRouter();
    
    const handleUnfollow = async() => {
        if(!user?.id) return;
        const data = await followUser(user?.id, userToFollowId, "unfollow");
        closeModal()
        if(!data?.error){
            router.refresh()
            dispatch(removeFromFollowing(userToFollowId));
        }
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