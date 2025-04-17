'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Video } from '@/config/videos';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link 
      href={`/videos/${video.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={`${video.title} thumbnail`}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{video.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{video.description}</p>
        <div className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          Watch Now 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" 
            />
          </svg>
        </div>
      </div>
    </Link>
  );
} 