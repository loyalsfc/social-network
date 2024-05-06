"use client"

import { ModalWrapper } from '@/components/modal/modal-wrapper'
import { Edit2 } from 'lucide-react'
import React from 'react'
import ProfileFormControl, {ProfileTextArea} from './form-control'
import { useAppSelector } from '@/lib/hook'
import { Button } from '@/components/authentication/form-control/form-control'
import { useFormState } from 'react-dom'
import { updateProfile } from '@/app/action'
import { cn } from '@/lib/utils'

const initialState = {
    message: '',
}

function Edit() {
    const [state, formAction] = useFormState(updateProfile, initialState)
    const {user} = useAppSelector(state => state.user)

    return (
        <ModalWrapper
            title='Edit Modal'
            btnText=''
            Icon={Edit2}
            className='profile-btn'
            size='sm:max-w-[525px]'
        >
            <form className='space-y-4' action={formAction}>
                {state?.message && 
                    <p className={cn('text-center p-2 rounded', state.message === "Edit Successful" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500")}>{state?.message}</p>
                }
                <ProfileFormControl
                    label="Name"
                    defaultValue={user?.name}
                    maxLength={50}
                    name='name'
                />
                <ProfileTextArea 
                    label='Bio'
                    maxLength={160}
                    defaultValue={user?.bio}
                    rows={3}
                    name='bio'
                />
                <ProfileFormControl
                    label="Profession"
                    defaultValue={user?.profession}
                    maxLength={30}
                    name='profession'
                />
                <Button text='Save'/>
            </form>
        </ModalWrapper>
    )
}

export default Edit