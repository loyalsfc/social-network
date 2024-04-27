import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header/header";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  if(!cookies().get('access-token')?.value){
    redirect("/sign-in")
  }
  
  const user = JSON.parse(cookies().get('user-details')?.value ?? "");

  return (
    <div className="space-y-4 h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="w-full max-w-7xl mx-auto flex-1 overflow-hidden flex items-start">
        <Sidebar user={user} />
        {children}
      </div>
    </div>
  );
}
