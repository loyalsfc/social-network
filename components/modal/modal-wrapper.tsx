import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { FC, LegacyRef, ReactNode } from "react"

interface Props{
    children: ReactNode,
    btnText: string,
    title: string,
    description?: string,
    footerButtonText?: string,
    showFooter?: boolean,
    className?: string,
    modalBtnRef?: LegacyRef<HTMLButtonElement>,
    Icon?: FC,
    size?: string,
}

export function ModalWrapper({
    children,
    btnText,
    title,
    description,
    showFooter,
    footerButtonText,
    className,
    modalBtnRef,
    Icon,
    size
}:Props) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <button 
                ref={modalBtnRef} 
                className={cn("flex items-center gap-2", className)}
            >
                {Icon && <Icon />}
                {btnText}
            </button>
        </DialogTrigger>
        <DialogContent className={cn(size ?? "sm:max-w-[425px]")}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
            {showFooter && <DialogFooter>
                <Button type="submit">{footerButtonText}</Button>
            </DialogFooter>}
        </DialogContent>
    </Dialog>
  )
}
