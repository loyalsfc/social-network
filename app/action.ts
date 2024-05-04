'use server'
import { z } from "zod"
import axios from "axios"
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 8000,
    headers: {'Accept': 'application/json'}
});

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
        const response = await instance.post("/v1/user", formBody)
        const data = response.data
    } catch (error) {
        console.log(error)
    }

    redirect("/confirmation")
}

const loginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters"
    })
})

export async function SignIn(prevState: any, formData: FormData){
    const validatedFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get("password")
    })

    if(!validatedFields.success) {
        return {
            message: JSON.parse(validatedFields.error.message)[0].message,
        }
    }

    const {email, password} = validatedFields.data

    const formBody = {email, password}

    try {
        const response = await instance.post("/v1/sign", formBody)
        const data = response.data
        cookies().set('access-token', data?.access_token);
        cookies().set("user-details", JSON.stringify(data?.user));
    } catch (error) {
        console.log(error)
        return {
            message: "Invalid email or password",
        }
    }

    if(cookies().get('access-token')?.value){
        redirect("/");
    }
}

export async function signOut(){
    cookies().delete("access-token")
    cookies().delete("user-details")

    redirect("/sign-in")
}

export async function fetchUser(username: string){
    const accessToken = cookies().get("access-token")?.value;
    instance.defaults.headers.common["Authorization"] = `ApiKey ${accessToken}`
    try {
        const response = await instance.get(`/v1/user?username=${username}`)
        return response.data
    } catch (error: any) {
        console.log(error)
        return {
            status: error?.data?.error
        }
    }
}

export async function uploadImage(file: File){
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fledge");
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        )
        return response.data
    } catch (error: any) {
        return {
            status: error.response.data
        }
    }
}

export async function changeProfilePicture(image_url: string, path: string, key: string){
    const accessToken = cookies().get("access-token")?.value;
    instance.defaults.headers.common["Authorization"] = `ApiKey ${accessToken}`
    try {
        const response = await instance.put(`/v1/${path}`,{
            [key]: image_url
        })
        const data = response.data
        cookies().set("user-details", JSON.stringify(data));
        return data
    } catch (error: any) {
        console.log(error)
        return {
            status: error?.data?.error
        }
    }
}