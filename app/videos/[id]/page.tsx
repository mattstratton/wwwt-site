import { notFound } from 'next/navigation';
import { videos } from '@/config/videos';
import { auth } from '@clerk/nextjs/server';
import { SignIn } from "@clerk/nextjs";
import VideoPlayer from '@/components/VideoPlayer';

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

  // Show sign-in component for unauthenticated users
  if (!userId) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Sign in to Watch</h1>
          <p className="text-gray-600 mb-8">Please sign in to access this video.</p>
          <SignIn />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{video.title}</h1>
        <p className="text-gray-600 mb-8">{video.description}</p>
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <VideoPlayer videoKey={video.filename} />
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