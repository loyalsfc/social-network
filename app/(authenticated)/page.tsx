import Feeds from "@/components/main/feeds/feeds";
import NewPost from "@/components/main/new-post/new-post";
import StoriesReels from "@/components/main/stories-reels/stories-reels";
import Suggestionbar from "@/components/suggestionbar/suggestionbar";
import { endpointGetRequests } from "../action";
import { cookies } from "next/headers";

export default async function Home() {
  const user = cookies().get("user-details")?.value;
  const userObj = JSON.parse(user ?? "")
  const feeds = await  endpointGetRequests(`/feeds?id=${userObj?.id}`)
  
  return (
    <main className="flex-1 h-full flex overflow-x-hidden">
      <div className="px-4 lg:px-10 h-full overflow-y-scroll flex-1">
        <section className="bg-white mb-4">
          <NewPost/>
          <StoriesReels />
        </section>
        <Feeds posts={feeds}/>
      </div>
      <Suggestionbar />
    </main>
  );
}
