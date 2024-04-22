'use server'
import { z } from "zod"
import axios from "axios"
import { redirect } from "next/navigation";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 8000,
    headers: {'Accept': 'application/json'}
});

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
})

export default async function createUser(prevState: any, formData: FormData){
    const validatedFields = formSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if(!validatedFields.success) {
        return {
            message: JSON.parse(validatedFields.error.message)[0].message,
        }
    }

    if(validatedFields.data.password.length < 6) {
        return {
            message: "Password Length must be greater than 6",
        }
    }

    const {name, email, password} = validatedFields.data

    const formBody = {
        name, email, password, username: "usersss"
    }

    try {
        console.log
        const response = await instance.post("/v1/user", formBody)
        const data = response.data

        // const res = await fetch(`${baseURL}v1/user`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     method: "POST",
        //     body: JSON.stringify(formBody)
        // })
        // const data = await res.json()
        // console.log(data)
        // return data;
    } catch (error) {
        console.log(error)
    }

    redirect("/confirmation")
}