'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Video Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the video you're looking for.
        </p>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          ← Return to Video Library
        </Link>
      </div>
    </main>
  );
} 