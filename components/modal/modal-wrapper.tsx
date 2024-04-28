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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode } from "react"

interface Props{
    children: ReactNode,
    btnText: string,
    title: string,
    description?: string,
    footerButtonText?: string,
    showFooter?: boolean,
    className?: string
}

export function ModalWrapper({
    children,
    btnText,
    title,
    description,
    showFooter,
    footerButtonText,
    className
}:Props) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <button className={className}>{btnText}</button>
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
