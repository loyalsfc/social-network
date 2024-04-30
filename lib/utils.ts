import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Cloudinary} from "@cloudinary/url-gen";
import { env } from "process";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const cld = new Cloudinary({cloud: {cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME}});