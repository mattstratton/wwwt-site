import { notFound } from 'next/navigation';
import { videos } from '@/config/videos';
import { auth } from '@clerk/nextjs/server';
import { SignIn } from "@clerk/nextjs";
import VideoPlayer from '@/components/VideoPlayer';
import Link from 'next/link';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const video = videos.find((v) => v.id === params.id);

  if (!video) {
    notFound();
  }

  // Get visible videos for navigation
  const visibleVideos = videos.filter(v => !v.hidden);
  const currentIndex = visibleVideos.findIndex(v => v.id === params.id);
  const previousVideo = currentIndex > 0 ? visibleVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < visibleVideos.length - 1 ? visibleVideos[currentIndex + 1] : null;

  // Show sign-in component for unauthenticated users
  if (!userId) {
    return (
      <main className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Sign in to Watch</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Please sign in to access this video.</p>
          <SignIn />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between mb-6">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            ← Back to Library
          </Link>
          <div className="flex gap-4">
            {previousVideo && (
              <Link
                href={`/videos/${previousVideo.id}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                ← {previousVideo.title}
              </Link>
            )}
            {nextVideo && (
              <Link
                href={`/videos/${nextVideo.id}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                {nextVideo.title} →
              </Link>
            )}
          </div>
        </nav>

        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{video.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{video.description}</p>
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-8">
          <VideoPlayer videoKey={video.filename} />
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {previousVideo && (
            <Link
              href={`/videos/${previousVideo.id}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              ← Previous: {previousVideo.title}
            </Link>
          )}
          {nextVideo && (
            <Link
              href={`/videos/${nextVideo.id}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center ml-auto"
            >
              Next: {nextVideo.title} →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

// Generate static params for all videos
export function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }));
} 