import React from 'react'
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Embeded from '@/components/embeded/embeded';
import { endpointGetRequests } from '@/app/action';
import { Button } from '@/components/ui/button';

interface Props{
    postId: string
    closeEdit: ()=>void;
}

function EmbedPost({
    postId,
    closeEdit, 
}:Props) {
    const {data, isLoading} = useQuery({
        queryKey: ["embeded", postId],
        queryFn: ()=>endpointGetRequests(`/post/${postId}`)
    })

    function copyiframe(){
        window.navigator.clipboard.writeText(`<iframe src="https://www.fledge.com/embeded/post/${postId}" width="500" height="213" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`)
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center'>
            <div onClick={closeEdit} className="absolute h-full w-full bg-black/30"/>
            <div className='flex flex-col bg-white w-full max-w-xl shrink-0 z-50 rounded-xl shadow pb-6'>
                <h4 className='relative border-b py-4'>
                    <span className='text-xl font-semibold block text-center'>Embed Post</span>
                    <button  
                        className='absolute top-1/3 right-4 h-8 w-8 rounded-full hover:bg-black/30 grid place-content-center'
                        onClick={closeEdit}
                    ><X /></button>
                </h4>
                <div className='px-8 py-4'>
                    <p>Copy and paste this code into your website.</p>
                    <div className='flex gap-4'>
                        <p className='flex-1 text-ellipsis whitespace-nowrap overflow-hidden h-full px-3 p-2 bg-black/15 rounded'>
                            {"<"}iframe src="https://www.fledge.com/embeded/post/{postId}" width="500" height="213" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"{"></iframe>"}
                        </p>
                        <Button 
                            className='bg-primary font-semibold transition-all active:scale-90'
                            onClick={copyiframe}
                        >
                            Copy code
                        </Button>
                    </div>
                </div>
                <div className='px-8 max-h-[400px] overflow-y-scroll'>
                    {!isLoading && <Embeded post={data}/>}
                </div>
            </div>
        </div>
    )
}

export default EmbedPost