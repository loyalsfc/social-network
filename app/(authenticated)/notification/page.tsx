import Suggestionbar from "@/components/suggestionbar/suggestionbar";
import { Settings } from "lucide-react";
import dummyData from "@/data/dummy-data";
import Card from "@/components/notifications/card";

const notifications = [
    {
        user: dummyData[0],
        notification: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
    },
    {
        user: dummyData[0],
        notification: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
    },
    {
        user: dummyData[0],
        notification: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
    },
    {
        user: dummyData[0],
        notification: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
    },
    {
        user: dummyData[0],
        notification: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
    },
    {
        user: dummyData[0],
        notification: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
    },
] 

export default function Home() {
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
                {notifications.map((item, index) => {
                    const {profileImage, name, username, isVerified} = item.user
                    return <Card
                        key={index}
                        image={profileImage}
                        fullName={name}
                        isVerified={isVerified}
                        username={username}
                        date={new Date("03-12-2024")}
                        notificationText={item.notification}
                    />
                })}
            </div>
        </div>
        <Suggestionbar />
    </main>
  );
}
