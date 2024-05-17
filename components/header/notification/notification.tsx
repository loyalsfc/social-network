import { NotificationInterface } from "@/@types"
import Card from "@/components/notifications/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import TriggerBtn from "./trigger-btn"

export default function NotificationPopOver({
    notifications
}:{
    notifications: NotificationInterface[] 
}) {   
    return (
        <Popover 
            modal={true}
        >
            <PopoverTrigger asChild>
                <div>
                    <TriggerBtn notifications={notifications} />
                </div>
            </PopoverTrigger>
            <PopoverContent className={cn("w-full max-w-lg bg-[#F1F1F1] max-h-96", notifications.length && "overflow-y-scroll")}>
                {notifications.length ? <div className="space-y-2">
                    {notifications.map(item => {
                        return <Card
                            key={item.id}
                            image={item.profile_picture}
                            fullName={item.name}
                            isVerified={item.is_verified}
                            username={item.username}
                            date={new Date(item.created_at)}
                            notificationText={item.content}
                            isRead={item.is_viewed}
                            reference={item.reference}
                            type={item.notification_source}
                        />
                    })}
                </div>:<div className="py-10 text-xl font-semibold text-center bg-white px-16">Notification is empty</div>}
            </PopoverContent>
        </Popover>
    )
}
