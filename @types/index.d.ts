export type Media = {
    url: string,
    mediaType: "image" | "video"
}

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
    media: Media[]
    username: string,
    created_at: string,
    updated_at: string,
    likes_count: int,
    comments_count: int,
    bookmarks_count: int,
    shared_count: int,
    name: string,
    profile_picture: string,
    is_verified: boolean,
    liked_users: string,
    bookmarked_users: string,
    is_shared: boolean,
    shared_post_id: string,
}

export interface CommentInterface{
    id: string,
    comment_text: string,
    media: Media[],
    username: string,
    post_id: string,
    likes_count: int,
    reply_count: int,
    created_at: string,
    updated_at: string,
    name: string,
    profile_picture: string,
    is_verified: boolean,
    liked_users: string[]
}

export interface NotificationInterface{
    id: string,
    username: string,
    content: string,
    created_at: string,
    is_viewed: boolean,
    notification_source: "likes" | "comments" | "follow",
    reference: string,
    name: string,
    profile_picture: string,
    is_verified: boolean
}