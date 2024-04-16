import { RegistrationForm } from '@/components/authentication/registeration-form/registration-form'
import AuthWrapper from '@/components/authentication/wrapper/header'
import Link from 'next/link'
import React from 'react'

function Page() {
    return (
        <div>
            <AuthWrapper
                headertext='have an account?'
                headerLink='/sign-in'
                headerLinkText='Sign in'
                title='Create Your Account'
                note='Sign up into your account'
            >
                <RegistrationForm />
            </AuthWrapper>
        </div>
    )
}

export default Page