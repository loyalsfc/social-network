export interface UserInterface {
    id: string,
    name: string,
    username: string,
    email: string,
    bio: string,
    profession: string,
    is_verified: boolean
    is_active: boolean
    profile_picture: string,
    cover_picture: string,
    created_at: string,
    updated_at: string
}

export interface PostInterface{
    id: string,
    user_id: string,
    content: string,
    media: {
            url: string,
            mediaType: "image" | "video"
        }[]
    username: string,
    created_at: string,
    updated_at: string,
    name: string
    profile_picture: string
    is_verified: boolean
}