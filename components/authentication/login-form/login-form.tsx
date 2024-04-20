"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import FormControlInput, { Button, PasswordInput, SwitchInput } from "../form-control/form-control"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email"
  }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters"
  }),
  staySignIn: z.boolean().default(false)
})

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          staySignIn: false
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[400px] mx-auto space-y-2 pt-6">
            <FormControlInput
                name="email"
                placeholder="Email"
                control={form.control}
                label="Email"
            />
            <PasswordInput name="password" control={form.control} />
            <div className="text-sm flex items-center justify-between mb-2">
                <SwitchInput control={form.control} name="name" />
                <Link href="/" className="text-xs hover:underline text-[#D93F21]">Recover Password</Link>
            </div>
            <Button text="LOG IN" />
        </form>
    </Form>
  )
}
