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
import { LegacyRef, ReactNode } from "react"

interface Props{
    children: ReactNode,
    btnText: string,
    title: string,
    description?: string,
    footerButtonText?: string,
    showFooter?: boolean,
    className?: string,
    modalBtnRef?: LegacyRef<HTMLButtonElement>
}

export function ModalWrapper({
    children,
    btnText,
    title,
    description,
    showFooter,
    footerButtonText,
    className,
    modalBtnRef
}:Props) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <button ref={modalBtnRef} className={className}>{btnText}</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
