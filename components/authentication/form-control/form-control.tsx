'use client'

import React, { useState } from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control } from 'react-hook-form';
import { Eye, EyeOffIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Props {
    name: "password" | "name" | "email";
    control: Control<{ name: string; email: string; password: string; staySignIn: boolean }, any>;
    label?: string;
    placeholder?: string;
}

export function Button({text}:{text:string}) {
    return(
        <button 
            type="submit" 
            className="w-full px-4 py-3 rounded-[10px] bg-secondary text-white hover:bg-primary font-semibold"
        >
            {text}
        </button>
    )
}

export function SwitchInput({control, name}:Props){
    return(
        <FormField
              control={control}
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