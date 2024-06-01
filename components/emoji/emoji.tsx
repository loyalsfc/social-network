import React, { Dispatch, RefObject, SetStateAction } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import EmojiPicker, {EmojiStyle} from 'emoji-picker-react'

import { Smile } from 'lucide-react'

function Emoji({
    setContent,
    inputRef,
    iconSize
}:{
    setContent: Dispatch<SetStateAction<string>>
    inputRef: RefObject<HTMLTextAreaElement | HTMLInputElement> 
    iconSize?: number
}) {
    
    return (
        <Popover>
            <PopoverTrigger>
                <span className='text-black/60 hover:scale-105 transition-all pt-1.5'>
                    <Smile size={iconSize}/>        
                </span>
                </PopoverTrigger>
            <PopoverContent>
            <EmojiPicker
                emojiStyle={EmojiStyle.NATIVE}
                open={true}
                onEmojiClick={(emoji) => {
                    setContent(prevState => {
                        const cursorPosition = inputRef.current?.selectionStart ?? prevState.length;
                        return prevState.slice(0, cursorPosition) + emoji.emoji + prevState.slice(cursorPosition);
                    })
                }} 
            />
            </PopoverContent>
        </Popover>  
    )
}

export default Emoji