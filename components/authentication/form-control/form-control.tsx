'use client'

import React, { useState } from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Control, FieldValues } from 'react-hook-form';
import { Eye, EyeOffIcon } from 'lucide-react';

interface Props {
    name: "password" | "name" | "email";
    control: Control<{ name: string; email: string; password: string; }, any>;
    label?: string;
    placeholder?: string;
}

export function PasswordInput({
    control,
}:Props) {
    const [inputType, setInputType] = useState<"text" | "password">("password")
    return (
        <div className='relative'>
            <FormField
                control={control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormControl className='relative'>
                            <input className='auth-input' placeholder="Password" {...field} type={inputType} />
                        </FormControl>
                        <FormMessage className='text-xs' />
                    </FormItem>
                )}
            />
            <button 
                onClick={()=>setInputType(prevState => prevState === "text" ? "password" : "text")} 
                className="absolute top-4 right-2 "
            >
                {inputType === "password" ? <Eye /> : <EyeOffIcon/>}
            </button>
        </div>
    )
}

function FormControlInput({
    name,
    control,
    placeholder,

}:Props) {
    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
                <FormControl>
                    <input className='auth-input' placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
    )
}

export default FormControlInput