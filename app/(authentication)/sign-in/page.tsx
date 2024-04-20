import { LoginForm } from '@/components/authentication/login-form/login-form'
import { RegistrationForm } from '@/components/authentication/registeration-form/registration-form'
import AuthWrapper from '@/components/authentication/wrapper/header'
import Link from 'next/link'
import React from 'react'

function Page() {
    return (
        <div>
            <AuthWrapper
                headertext="Don't have an account?"
                headerLink='/sign-up'
                headerLinkText='Sign up'
                title='Welcome Back'
                note='Login into your account'
            >
                <LoginForm />
            </AuthWrapper>
        </div>
    )
}

export default Page