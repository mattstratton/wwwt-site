import { videos } from '@/config/videos';
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import VideoCard from '../app/components/VideoCard';

export default async function Home() {
  const { userId } = await auth();
  
  // Show sign-in button for unauthenticated users
  if (!userId) {
    return (
      <main className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Welcome to When We Were Thin</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to access the video archive.</p>
          <SignIn />
        </div>
      </main>
    );
  }

  // Filter out hidden videos
  const visibleVideos = videos.filter(video => !video.hidden);

  return (
    <main className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Video Library</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </main>
  );
} 