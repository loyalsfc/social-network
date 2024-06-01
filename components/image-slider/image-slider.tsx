'use client'

import * as React from "react"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Media } from "@/@types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ImageCarousel({
    media,
    postId
}:{
    media: Media[],
    postId: string
}) {
    // const 
    const [currentImage, setCurrentImage] = React.useState()
    const router = useRouter();

    return (
        <div className="h-full w-full px-16 py-8 relative">
            <div className="h-full relative flex flex-nowrap overflow-x-scroll hide-scrollbar">
                {media.map((item, index) => (
                <div key={index} className="h-full w-full shrink-0">
                    <div className="p-1 h-full w-full relative">
                        <Image
                            src={item.url}
                            fill
                            alt="image"
                            className="object-contain"
                        />
                    </div>
                </div>
                ))}
            </div>
            <div
                className="h-7 w-7 grid place-content-center rounded-full cursor-pointer bg-white absolute top-1/2 left-6 -translate-x-1/2" 
                onClick={prevImage}
            >
                <ArrowLeft size={20} />
            </div>
            <div
                className="h-7 w-7 grid place-content-center rounded-full cursor-pointer bg-white absolute top-1/2 right-6 -translate-x-1/2"  
                onClick={nextImage}
            >
                <ArrowRight size={20}    />
            </div>
        </div>
    )
}
