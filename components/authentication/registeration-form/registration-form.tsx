"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import FormControlInput, { PasswordInput } from "../form-control/form-control"
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
  })
})

export function RegistrationForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: ""
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
                name="name"
                placeholder="Name"
                control={form.control}
                label="Name"
            />
            <FormControlInput
                name="email"
                placeholder="Email"
                control={form.control}
                label="Email"
            />
            <PasswordInput name="password" control={form.control} />
            <p className="text-xs font-light py-1.5 leading-5 text-[#6C6C6C]">
                By signing up you agree to our 
                <Link className="hover:underline px-1 text-secondary" href={""}>Terms of Service</Link> and 
                <Link className="hover:underline px-1 text-secondary" href={""}>Privacy policy</Link> and confirm that you are at least 18 years old
            </p>
            <button 
                type="submit" 
                className="w-full px-4 py-3 rounded-[10px] bg-secondary text-white hover:bg-primary font-semibold"
            >
                Submit
            </button>
        </form>
    </Form>
  )
}
