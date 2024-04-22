'use client'

import React, { ButtonHTMLAttributes, useState } from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Eye, EyeOffIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Props {
    name: "password" | "name" | "email";
    label?: string;
    placeholder?: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // Additional props can be defined here if needed
    text: string
}

export const Button: React.FC<ButtonProps> = ({text, ...props}) => {
    return(
        <button 
            {...props}
            type="submit" 
            className="w-full px-4 py-3 rounded-[10px] bg-secondary text-white hover:bg-primary font-semibold"
        >
            {text}
        </button>
    )
}

export function SwitchInput({name}:Props){
    return(
        <FormField
              name={"staySignIn"}
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse items-center gap-1">
                    <FormLabel className='text-xs pt-2'>Remember Me</FormLabel>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                  </FormControl>
                </FormItem>
              )}
            />
    )
}

export function PasswordInput({
    
}:Props) {
    const [inputType, setInputType] = useState<"text" | "password">("password")
    return (
        <div className='relative'>
            <input name='password' className='auth-input' placeholder="Password" type={inputType} />            
            <button 
                onClick={()=>setInputType(prevState => prevState === "text" ? "password" : "text")} 
                className="absolute top-4 right-2 "
                type='button'
            >
                {inputType === "password" ? <Eye /> : <EyeOffIcon/>}
            </button>
        </div>
    )
}

function FormControlInput({
    name,
    placeholder,

}:Props) {
    return (
        <input name={name} className='auth-input' placeholder={placeholder} />
    )
}

export default FormControlInput