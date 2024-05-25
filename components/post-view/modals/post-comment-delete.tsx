import React, { RefObject, useState } from 'react'
import { Button } from '../../ui/button'
import { endpointDeleteRequests } from '@/app/action';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Props{
    id: string;
    path: string;
    closeDelete: ()=>void;
    itemRef?: RefObject<HTMLDivElement>
}

function PostCommentDelete({id, path, closeDelete, itemRef}:Props) {
    const [isLoading, setIsLoading] = useState(false)
    const pathName = usePathname()
    const router = useRouter();
    
    async function deleteComment(){
        setIsLoading(true);
        const response = await endpointDeleteRequests(`${path}/${id}`);
        setIsLoading(false);    
        if(response.error){
            toast.error("An error occured");
            return;
        }

        //if the current route is the post page and the user is deeting the post
        //step back after delete
        //otherwise refresh the page
        if(pathName === `/post/${id}` && path === "/post"){
            router.back()
        } 
        if(itemRef?.current){
            itemRef.current.remove()
        }else {
            router.refresh();
        }
        closeDelete();
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center'>
            <div onClick={closeDelete} className="absolute h-full w-full bg-black/30"/>
            <div className='flex flex-col bg-white w-full max-w-sm shrink-0 z-50 p-8 rounded-xl shadow'>
                <article className='text-center pb-4'>
                    <h4 className='text-xl font-medium mb-2'>Confirm Delete</h4>
                    <p>Are you sure you want to delete this {path.replace("/", "")}?</p>
                    <p>Note that the action is irreversible</p>
                </article>
                <div className='flex flex-col gap-3'>
                    <Button 
                        className='bg-red-500' 
                        onClick={deleteComment}
                        disabled={isLoading}
                    >
                        {isLoading ? <span className='h-4 w-4 rounded-full border-white border-t-gray-700 border-2 animate-spin' /> : "Confirm"}
                    </Button>
                    <Button onClick={closeDelete}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default PostCommentDelete