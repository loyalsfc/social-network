"use client"

import FormControlInput, { Button, PasswordInput } from "../form-control/form-control"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import createUser from "@/app/action"

const initialState = {
  message: ""
}

export function RegistrationForm() {
  const {pending} = useFormStatus()
  const [state, formAction] = useFormState(createUser, initialState)

  return (
    <form action={formAction} className="max-w-[400px] mx-auto space-y-2 pt-2">
      <div className="text-center text-red-500 capitalize text-sm font-medium">{state?.message}</div>
      <FormControlInput
          name="name"
          placeholder="Name"
          label="Name"
      />
      <FormControlInput
          name="email"
          placeholder="Email"
          label="Email"
      />
      <PasswordInput name="password" />
      <p className="text-xs font-light py-1.5 leading-5 text-[#6C6C6C]">
          By signing up you agree to our 
          <Link className="hover:underline px-1 text-secondary" href={""}>Terms of Service</Link> and 
          <Link className="hover:underline px-1 text-secondary" href={""}>Privacy policy</Link> and confirm that you are at least 18 years old
      </p>
      <Button text="SIGN UP"  disabled={pending} />
    </form>
  )
}
