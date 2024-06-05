'use client'

import React, {useEffect, useState} from "react"

import { Media } from "@/@types"
import Image from "next/image"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { KeyPairKeyObjectResult } from "crypto"
import NotFound from "../not-found/not-found"

export default function ImageCarousel({
    media,
}:{
    media: Media[],
}) {
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = useParams<{ id: string; type: string; index: string; }>()
    const [currentImage, setCurrentImage] = useState(parseInt(searchParams.get("index") ?? "1"))
    
    const router = useRouter();

    useEffect(()=>{
        document.addEventListener("keydown", goBack)

        return ()=> document.removeEventListener("keydown", goBack)
    },[])

    function goBack(e: KeyboardEvent){
        if(e.key === "Escape") router.push(`/post/${params.id}/`)
    }

    function nextImage(){
        // setCurrentImage(prevState => {
            if (currentImage === media.length) {
                return
            }else {
                setCurrentImage(prevState => prevState + 1)
            }
    }

    function prevImage(){
        // setCurrentImage(prevState => {
            if (currentImage === 0) {
                return
            }else {
                setCurrentImage(prevState => prevState - 1)
            }
    }

    if(!searchParams.get("index") || parseInt(searchParams.get("index") ?? "") > media.length){
        return <div className="h-full w-full px-16 py-16 bg-white">
                <NotFound />
            </div>
    }

    return (
        <div className="h-full w-full px-16 py-8 relative">
            <div className="overflow-hidden h-full w-full">
                <div 
                    className="h-full relative flex flex-nowrap transition-all"
                    style={{transform: `translateX(-${(currentImage - 1) * 100}%)`}}
                >
                    {media.map((item, index) => (
                        <div key={index} className="relative h-full w-full shrink-0">
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
            </div>
            <button
                className="h-7 w-7 grid place-content-center rounded-full cursor-pointer bg-white absolute top-1/2 left-6 -translate-x-1/2 disabled:bg-grey-100 disabled:cursor-not-allowed" 
                onClick={prevImage}
                disabled={currentImage === 1}
            >
                <ArrowLeft size={20} />
            </button>
            <button
                className="h-7 w-7 grid place-content-center rounded-full cursor-pointer bg-white absolute top-1/2 right-6 -translate-x-1/2 disabled:bg-grey-100 disabled:cursor-not-allowed"  
                onClick={nextImage}
                disabled={currentImage === media.length}
            >
                <ArrowRight size={20}    />
            </button>
        </div>
    )
}
