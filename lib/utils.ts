import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Cloudinary} from "@cloudinary/url-gen";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cld = new Cloudinary({cloud: {cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME}});

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

const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
export const getPublicIdFromUrl = (url: string) => {
  console.log(url);
  const match = url.match(regex);
  console.log(match);
  return match ? match[1] : null;
};