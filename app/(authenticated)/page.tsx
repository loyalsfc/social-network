import Feeds from "@/components/main/feeds/feeds";
import NewPost from "@/components/main/new-post/new-post";
import StoriesReels from "@/components/main/stories-reels/stories-reels";
import Suggestionbar from "@/components/suggestionbar/suggestionbar";

export default function Home() {
  return (
    <main className="flex-1 h-full flex overflow-x-hidden">
      <div className="px-4 h-full overflow-y-scroll flex-1">
        <section className="bg-white mb-4">
          <NewPost/>
          <StoriesReels />
        </section>
        <Feeds />
      </div>
      <Suggestionbar />
    </main>
  );
}
