import React, { InputHTMLAttributes, TextareaHTMLAttributes, createRef, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
}

export const ProfileTextArea: React.FC<TextAreaProps> = ({label, ...props}) => {
    const ref = createRef<HTMLTextAreaElement>()
    const [length, setLength] = useState(typeof props.defaultValue === "string" ? props.defaultValue.length : 0)
    return (
        <div className='relative'>
            <textarea
                ref={ref}
                className='pt-5 block w-full pl-2 pb-1 profile-input peer resize-none overflow-hidden'
                {...props}
                onChange={(e)=>{
                    setLength(e.target.value.length)
                }}

            />
            <label htmlFor="" className='absolute top-0.5 left-2 text-sm text-gray-500 peer-focus:text-secondary'>{label}</label>
            <span className='text-gray-500 font-medium absolute top-0.5 right-2 text-sm hidden peer-focus:block'>{length}/{props.maxLength}</span>
        </div>
    )
}

const ProfileFormControl:React.FC<InputProps> = ({label, ...props}) => {
    const ref = createRef<HTMLInputElement>()
    const [length, setLength] = useState(typeof props.defaultValue === "string" ? props.defaultValue.length : 0)
    return (
        <div className='relative'>
            {<input 
                ref={ref}
                className='pt-5 block w-full pl-2 pb-1 profile-input peer'
                type="text"  
                {...props}
                onChange={(e)=>{
                    setLength(e.target.value.length)
                }}

            />}
            <label htmlFor="" className='absolute top-0.5 left-2 text-sm text-gray-500 peer-focus:text-secondary'>{label}</label>
            <span className='text-gray-500 font-medium absolute top-0.5 right-2 text-sm hidden peer-focus:block'>{length}/{props.maxLength}</span>
        </div>
    )
}

export default ProfileFormControl