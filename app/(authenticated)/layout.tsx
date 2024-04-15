import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-4 h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="w-full max-w-7xl mx-auto flex-1 overflow-hidden flex items-start">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
