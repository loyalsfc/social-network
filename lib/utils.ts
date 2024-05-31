import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Cloudinary} from "@cloudinary/url-gen";
import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CommentMedia, Media } from "@/@types";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

export const timeAgo = new TimeAgo("en-US")

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cld = new Cloudinary({cloud: {cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME}});

export async function uploadImage(file: File, resource_type: "image" | "video"){
  try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fledge");
      const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`,
          formData
      )
      return response.data
  } catch (error: any) {
      return {
          status: error.response.data
      }
  }
}

export const handleImageUpload = async(
  e: ChangeEvent<HTMLInputElement>, 
  mediaType: "image" | "video", 
  setBlobs: Dispatch<SetStateAction<Media[]>>
) => {
  const files = e.target.files;

  if(!files) return;

  for (let index = 0; index < files?.length; index++) {
      const file = files[index];
      const data = await uploadImage(file, mediaType)
      // const url = URL.createObjectURL(file)
      if(!data?.secure_url) return;
      setBlobs(prevState => [...prevState, {
          mediaType,
          url: data?.secure_url
      }])
  }
}

export const uploadSingleMedia = async(
  e: ChangeEvent<HTMLInputElement>, 
  mediaType: "image" | "video", 
  setMedia: Dispatch<SetStateAction<CommentMedia>>
) => {
  const files = e.target.files;

  if(!files) return;
  setMedia({
    status: "loading",
    data: null
})
  const file = files[0];
  const data = await uploadImage(file, mediaType)
  // const url = URL.createObjectURL(file)
  if(!data?.secure_url) return;
  setMedia({
    status: "active",
    data: {
      mediaType,
      url: data?.secure_url
    }
  })
}

export const restoreMediaToDefault = (setMedia: Dispatch<SetStateAction<CommentMedia>>) => {
  setMedia({
      status: "pending",
      data: null
  })
}

const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
export const getPublicIdFromUrl = (url: string) => {
  console.log(url);
  const match = url.match(regex);
  console.log(match);
  return match ? match[1] : null;
};