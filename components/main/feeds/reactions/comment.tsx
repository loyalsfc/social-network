'use client'

import { CommentMedia, SearchInterface } from '@/@types'
import { endpointGetRequests, insertComment } from '@/app/action'
import Avatar from '@/components/avatar/avatar'
import Emoji from '@/components/emoji/emoji'
import ProfilePictureAvatar from '@/components/profile-picture-avatar/profile-picture-avatar'
import { useAppSelector } from '@/lib/hook'
import { cn, restoreMediaToDefault, uploadSingleMedia } from '@/lib/utils'
import { ImageIcon, SendHorizonal, Verified, Video, X } from 'lucide-react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, createRef, useEffect, useOptimistic, useRef, useState } from 'react'
import { toast } from 'react-toastify'

type Comment = {
    comment: string
}
const regex = /@[^\s@]+/g;

function CommentBox({
    isShown, 
    postID,
    setCommentCount,
    className,
    fixedCommentBox
}:{
    isShown: boolean, 
    postID: string,
    setCommentCount: Dispatch<SetStateAction<number>>,
    className?: string
    fixedCommentBox: boolean
}) {
    const commentRef = useRef<HTMLDivElement>(null)
    const [commentText, setCommentText] = useState<string>("")
    const [media, setMedia] = useState<CommentMedia>({
        status: "pending",
        data: null
    })
    const [isFocused, setIsFocused] = useState(false)
    const {user} = useAppSelector(state => state.user);
    const inputRef = useRef<HTMLInputElement>(null);
    const [optimisticComments, addOptimisticComment] = useOptimistic<
        Comment[],
        string
    >([], (state, newComment) => [...state, { comment: newComment}])
    const [suggestions, setSuggestions] = useState<SearchInterface[]>([])

    useEffect(()=>{
        const hidePopUp = (event: any) => {
            if(!commentRef.current?.contains(event.target)){
                setSuggestions([])
            }
        }

        document.addEventListener("click", hidePopUp);

        return()=> document.removeEventListener("click", hidePopUp)
    },[])

    useEffect(()=>{
        if(isShown && !fixedCommentBox){
            inputRef.current?.focus();
        }
    },[isShown])

    const addComment = async () => {
            const comment = inputRef.current?.innerHTML
            if(!comment) return;
            inputRef.current!.value = "";
            addOptimisticComment(comment)
            const data = await insertComment({
                content: comment,
                media: media.status === "active" ? [media.data] : [],
                post_id: postID
            })
            if(data?.error === ""){
                setCommentCount(data?.payload);
                toast.success("comment successful");
                restoreMediaToDefault(setMedia);
                setCommentText("");
                setIsFocused(false);

                if (inputRef.current) {
                    inputRef.current.innerHTML = "";
                }
            }
    }

    function sendWithEnterKey(event: React.KeyboardEvent<HTMLDivElement>){
        if (event.shiftKey && event.key === "Enter") {
            return;
        }
        if(event.key === "Enter"){
            event.preventDefault();
            addComment()
        }
    }

    function getCurrentWord(event: React.KeyboardEvent<HTMLDivElement>){
        const selection = window.getSelection();
        if (selection?.rangeCount === 0) return;

        const range = selection?.getRangeAt(0);
        const container = range?.startContainer;
        const text = container?.textContent ?? "";

        // Find the caret position
        const caretOffset = range?.startOffset;

        // Extract the word around the caret
        const beforeCaret = text.slice(0, caretOffset);

        // Find the last word in beforeCaret
        const words = beforeCaret.split(/\s+/);
        const lastWord = words[words.length - 1];

        const isUsername = () => {
            return lastWord.length > 1 && lastWord.startsWith("@");
        }

        if(!isUsername()){
            setSuggestions([]);
            return;
        }

        displaySuggestion(lastWord)

        const replacement = `<span class='text-primary'>${lastWord}</span>`;
        
        // Update the content
        const newText = text.replace(new RegExp(`\\b${lastWord}\\b`), replacement);
        
        if(!container) return;
        container.textContent = newText;

        // Adjust the caret position
        if(caretOffset){   
            range.setStart(container, caretOffset);
            range.setEnd(container, caretOffset);
        }

        setCommentText(container.parentElement?.innerHTML ?? "");
    }
    
    function handleInput(event: React.KeyboardEvent<HTMLDivElement>){
        setCommentText(event.currentTarget.innerHTML)
    }

    async function displaySuggestion(word: string){
        const data = await endpointGetRequests(`/users/search?query=${word.replace("@", "")}`);
        setSuggestions(data);
    }

    function replaceWord(username: string){
        
    }
    
    return (
        <div ref={commentRef} className={cn('flex flex-col relative', className)}>
            {suggestions.length > 0 && <div className='h-32 bg-white w-80 shrink-0 absolute left-11 -top-28 z-10 shadow-lg rounded p-4'>
                <ul>
                    {suggestions.map((item)=>{
                        return(
                            <li 
                                key={item.id}
                                className='flex items-center gap-2 cursor-pointer'
                                onClick={()=>replaceWord(item.username)}
                            >
                                <Avatar fullname={item.name} imageLink={item.profile_picture} size='24' />
                                <div>
                                    <h4 className='font-medium leading-tight'>{item.name} {item.is_verified && <Verified />}</h4>
                                    <span className='text-sm text-grey-100'>@{item.username}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>}
            <div>
                {optimisticComments?.map((item, index) => {
                    return(
                        <div key={index} className='flex items-center gap-2'>
                            <ProfilePictureAvatar
                                size={42}
                                link={user?.profile_picture ?? "/dummy.jpeg"}
                            />
                            <p className='opacity-50'>{item.comment}</p>
                        </div> 
                    )
                })}
            </div>
            {isShown && 
                <form>
                    <div className='flex relative mt-4 gap-1'>
                        <ProfilePictureAvatar
                            size={42}
                            link={user?.profile_picture ?? "/dummy.jpeg"}
                        />
                        <div className="flex-1">
                            <div className='relative rounded-2xl'>
                                <div 
                                    ref={inputRef}
                                    id='comment'
                                    className={cn(
                                            'w-full border border-black bg-transparent text-sm select-text whitespace-pre-wrap break-all max-h-28 overflow-y-scroll hide-scrollbar p-2 rounded-2xl focus:border-secondary focus:outline-none', 
                                            isFocused ? "pb-10 pr-2":"pr-7"
                                        )} 
                                    onFocus={()=>setIsFocused(true)}
                                    onKeyDown={sendWithEnterKey}
                                    onInput={getCurrentWord}
                                    onKeyUp={handleInput}
                                    contentEditable={true}
                                    spellCheck={true}
                                    role='textbox'
                                /> 
                                <div 
                                    className={cn(
                                        'next-element absolute flex items-center transition-all bg-white gap-1 text-black-100/70',
                                        !isFocused ? "right-2 bottom-1/2 translate-y-1/2 w-fit" : "bottom-1 left-1 px-2 w-[98%] rounded-full"
                                    )}
                                >
                                    <Emoji
                                        inputRef={inputRef}
                                        setContent={setCommentText}
                                        iconSize={20}
                                    />  
                                    {media.status === "pending" && <>
                                        <div>
                                            <label 
                                                htmlFor='comment-image'
                                                className='hover:scale-105 hover:text-primary transition-all'
                                            >
                                                <ImageIcon size={20} />
                                            </label>
                                            <input onChange={(e)=>uploadSingleMedia(e, "image", setMedia)} type="file" name="comment-image" hidden id="comment-image" accept='image/*' />
                                        </div>
                                        <button 
                                            className='hover:scale-105 hover:text-primary transition-all'
                                            type='button'
                                        >
                                            <Video size={24} />
                                        </button>
                                    </>}
                                    <button
                                        disabled={commentText === ""} 
                                        className={cn('hover:scale-105 disabled:opacity-30 hover:text-primary transition-all', isFocused && 'ml-auto')}
                                        onClick={addComment}
                                    >
                                        <SendHorizonal size={20} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                {media.status !== "pending" && <div className='relative h-44 w-28 rounded-md overflow-hidden mt-2'>
                                    <button 
                                        className='cancel-btn'
                                        onClick={()=>restoreMediaToDefault(setMedia)}
                                    >
                                        <X size={16}/>
                                    </button>
                                    {media.status === "loading" ? <div className='w-32'/>:<div>
                                        {media.data?.mediaType === "image" ? <Image
                                        src={media.data?.url ?? ""}
                                        fill
                                        alt="preview"
                                        className='object-cover'
                                    /> : <video src={media.data?.url} controls className='h-full w-full object-contain'/>}
                                    </div>}
                                </div>}
                            </div>
                        </div>
                    </div>
                </form>}
        </div>
    )
}

export default CommentBox