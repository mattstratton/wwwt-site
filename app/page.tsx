import Link from 'next/link';
import { videos } from '@/config/videos';
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  
  // Show sign-in button for unauthenticated users
  if (!userId) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to When We Were Thin</h1>
          <p className="text-gray-600 mb-8">Sign in to access the video archive.</p>
          <SignIn />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Video Library</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Link 
              key={video.id}
              href={`/videos/${video.id}`}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
              <p className="text-gray-600">{video.description}</p>
              <div className="mt-4 text-blue-600 hover:text-blue-800">
                Watch Now →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 