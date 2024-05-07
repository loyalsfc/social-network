import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header/header";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { getFollowInfo } from "../action";
import { UserInterface } from "@/@types";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  if(!cookies().get('access-token')?.value){
    redirect("/sign-in")
  }
  
  const user:UserInterface = JSON.parse(cookies().get('user-details')?.value ?? "");
  const followInfo = await getFollowInfo(user.id);
  return (
    <div className="space-y-4 h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="w-full max-w-7xl mx-auto flex-1 overflow-hidden flex items-start">
        <Sidebar user={user} followInfo={followInfo} />
        {children}
      </div>
    </div>
  );
}
