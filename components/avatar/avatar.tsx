import React from 'react'
import { Avatar as AvatarWraper, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = 
  | { link: string; fullname?: never } // Link is provided, fullname is optional (never allowed)
  | { link: undefined; fullname: string }; 

function Avatar({
    size,
    imageLink,
    fullname,
}:{
    size?: string;
    imageLink?: string;
    fullname?: string
}) {
    return (
        <AvatarWraper>
            <AvatarImage sizes={size} src={imageLink} />
            <AvatarFallback>CN</AvatarFallback>
        </AvatarWraper>
    )
}

export default Avatar