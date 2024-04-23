"use client"

import { useFormState, useFormStatus } from "react-dom"
import FormControlInput, { Button, PasswordInput, SwitchInput } from "../form-control/form-control"
import Link from "next/link"
import { SignIn } from "@/app/action"

const initialState = {
  message: ""
}

export function LoginForm() {
  const {pending} = useFormStatus()
  const [state, formAction] = useFormState(SignIn, initialState)

  return (
    <form className="max-w-[400px] mx-auto space-y-3 pt-6" action={formAction}>
        <div className="text-center text-red-500 capitalize text-sm font-medium">{state?.message}</div>
        <FormControlInput
            name="email"
            placeholder="Email"
            label="Email"
        />
        <PasswordInput name="password" />
        <div className="text-sm flex items-center justify-between mb-2">
            <SwitchInput name="name" />
            <Link href="/" className="text-xs hover:underline text-[#D93F21]">Recover Password</Link>
        </div>
        <Button text="LOG IN" disabled={pending}/>
    </form>
  )
}
