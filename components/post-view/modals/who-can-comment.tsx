import React, { FC, useState } from 'react'
import { Check, LucideGlobe2, User2, UserCheck2, X } from 'lucide-react';

interface Props{
    id: string;
    close: ()=>void;
}

type permission = "public" | "followed" | "only-you"

function WhoCanCommentSettings({id, close}:Props) {
    const [commentGroup, setCommentGroup] = useState<permission>("public")

    return (
        <div className='fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center'>
            <div onClick={close} className="absolute h-full w-full bg-black/30"/>
            <div className='flex flex-col bg-white w-full max-w-sm shrink-0 z-50 py-8 relative rounded-xl shadow'>
                <button 
                    className='absolute top-4 right-4'
                    onClick={close}
                >
                    <X/>
                </button>
                <article className='text-center pb-4 px-8'>
                    <h4 className='text-xl font-medium mb-2'>Who can comment?</h4>
                    <p>Choose who can reply to this post. Anyone mentioned can always reply.</p>
                </article>
                <ul className='flex flex-col gap-3'>
                    <WhoCanComments 
                        title='Everyone'
                        Icon={LucideGlobe2}
                        isChecked={commentGroup === "public"}
                        changeSetting={()=>setCommentGroup("public")}
                    />
                    <WhoCanComments 
                        title='People you follow'
                        Icon={UserCheck2}
                        isChecked={commentGroup === "followed"}
                        changeSetting={()=>setCommentGroup("followed")}
                    />
                    <WhoCanComments 
                        title='Only You'
                        Icon={User2}
                        isChecked={commentGroup === "only-you"}
                        changeSetting={()=>setCommentGroup("only-you")}
                    />
                </ul>
            </div>
        </div>
    )
}

function WhoCanComments({
    title,
    Icon,
    isChecked,
    changeSetting
}:{
    title: string;
    Icon: FC;
    isChecked?: boolean;
    changeSetting: ()=>void
}){
    return(
        <li 
            onClick={changeSetting}
            className='flex items-center gap-2 cursor-pointer px-8 py-2 hover:bg-black/5'
        >
            <div className='h-10 w-10 rounded-full grid place-content-center bg-primary/30'>
                <Icon />
            </div>
            <span className='font-medium'>{title}</span>
            {isChecked && <Check  className='ml-auto '/>}
        </li>
    )
}

export default WhoCanCommentSettings