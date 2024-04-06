import NewPost from "@/components/main/new-post/new-post";
import StoriesReels from "@/components/main/stories-reels/stories-reels";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4">
      
      <section className="bg-white">
        <NewPost/>
        <StoriesReels />
      </section>
    </div>
  );
}
