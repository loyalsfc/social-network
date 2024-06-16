'use server'
import { z } from "zod"
import axios from "axios"
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

function setAuthorization(){
    const accessToken = cookies().get("access-token")?.value;
    instance.defaults.headers.common["Authorization"] = `ApiKey ${accessToken}`
}

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

    const formBody = {name, email, password}

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
        instance.defaults.headers.common["Authorization"] = `ApiKey ${data?.access_token}`
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

export async function changeProfilePicture(image_url: string, path: string, key: string){
    setAuthorization()
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

const updateSchema = z.object({
    name: z.string().min(2,{
        message: "Name can not be less than two characters"
    }),
    bio: z.string().optional(),
    profession: z.string().optional()
})

export async function updateProfile(prevState: any, formData: FormData){
    setAuthorization();
    const validatedFields = updateSchema.safeParse({
        name: formData.get("name"),
        bio: formData.get("bio"),
        profession: formData.get("profession")
    })

    if(!validatedFields.success){
        return{
            message: JSON.parse(validatedFields.error.message)[0].message
        }
    }

    const {name, profession, bio} = validatedFields.data;
    let success
    try {
        const response = await instance.put("/v1/update-user-profile", {
            name, profession, bio
        })
        const data = response.data;
        cookies().set("user-details", JSON.stringify(data));
        success = true;
        return {
            message: "Edit Successful"
        }
    } catch (error: any) {
        return {
            message: error?.data?.error
        }
    }
}

export const followUser = async(followerId: string, followingId: string, path: "follow" | "unfollow") => {
    setAuthorization();
    try {   
        const response = await instance.post(`/v1/${path}`, {
            following: followingId,
            follower: followerId
        })
        return response.data
    } catch (error: any) {
        console.log(error.response.data)
        return {
            error: error?.response?.data
        }
    }
}

export const getFollowInfo = async(userId: string) => {
    setAuthorization();
    try {
        const [followers, following] = await Promise.all([instance.get(`/v1/get-followers/${userId}`), instance.get(`/v1/get-following/${userId}`)])
        return{
            followers: followers.data, following: following.data
        }
    } catch (error: any) {
        console.log(error.response)
        return {
            error: error?.response?.data
        }
    }
}

export async function newPost(body: {}){
    setAuthorization();
    try {
        const response = await instance.post("/v1/new-post", body);
        return response.data;
    } catch (error: any) {
        console.log(error.response);
        return {
            error: error?.response?.data
        }
    }
}

export async function likeReaction(postID: string, path: string){
    setAuthorization();
    try {
        const response = await instance.post(`/v1/${path}-post`,{
            post_id: postID
        })
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error)
        return{
            error: error?.response?.data
        } 
    }
}

export async function insertComment(body: {}){
    setAuthorization();
    try {
        const response = await instance.post(`/v1/new-comment`, body)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        } 
    }
}

export async function deleteComment(commentID: string){
    setAuthorization()
    try {
        const response = await instance.delete(`/v1/comment/${commentID}`)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        }
    }
}

export async function  getPost(postID: string){
    setAuthorization()
    try {
        const response = await instance.get(`/v1/post/${postID}`)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        }
    }
}

export async function bookmarkPost(postID: string, path: string){
    setAuthorization();
    try {
        const response = await instance.post(`/v1/${path}`,{
            post_id: postID
        })
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        } 
    }
}

export async function getBookmarks(){
    setAuthorization();
    try {
        const response = await instance.get(`/v1/bookmarks`)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        } 
    }
}

export async function endpointGetRequests(path: string){
    setAuthorization();
    try {
        const response = await instance.get(`/v1${path}`)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        } 
    }
}

export async function endpointPostRequests(path: string, body: {}){
    setAuthorization();
    try {
        const response = await instance.post(`/v1${path}`, body)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        } 
    }
}

export async function endpointUpdateRequests(path: string, body: {}){
    setAuthorization();
    try {
        const response = await instance.put(`/v1${path}`, body)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        } 
    }
}

export async function endpointDeleteRequests(path: string){
    setAuthorization();
    try {
        const response = await instance.delete(`/v1${path}`)
        return response.data
    } catch (error: any) {
        return{
            error: error?.response?.data
        } 
    }
}