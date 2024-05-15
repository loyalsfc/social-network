import Suggestionbar from "@/components/suggestionbar/suggestionbar";
import { Settings } from "lucide-react";
import Card from "@/components/notifications/card";
import { endpointGetRequests } from "@/app/action";
import { NotificationInterface } from "@/@types";

export default async function Page() {
    const notifications:NotificationInterface[] = await endpointGetRequests("/notifications")
  return (
    <main className="flex-1 h-full flex">
        <div className="px-4 h-full overflow-y-scroll flex-1">
            <div className="flex items-center justify-between mb-4 bg-white p-4">
                <h4 className="text-2xl font-semibold text-black">Notification</h4>
                <button>
                    <Settings size={24} />
                </button>
            </div>
            <div className="space-y-2">
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
            </div>
        </div>
        <Suggestionbar />
    </main>
  );
}
