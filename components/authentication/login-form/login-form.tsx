"use client"

import FormControlInput, { Button, PasswordInput, SwitchInput } from "../form-control/form-control"
import Link from "next/link"

export function LoginForm() {
  return (
    <form className="max-w-[400px] mx-auto space-y-2 pt-6">
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
        <Button text="LOG IN" />
    </form>
  )
}
