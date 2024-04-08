import Feeds from "@/components/main/feeds/feeds";
import NewPost from "@/components/main/new-post/new-post";
import StoriesReels from "@/components/main/stories-reels/stories-reels";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 h-full overflow-y-scroll">
      
      <section className="bg-white mb-4">
        <NewPost/>
        <StoriesReels />
      </section>
      <Feeds />
    </div>
  );
}
