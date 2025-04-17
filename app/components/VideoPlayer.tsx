'use client';

import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  videoKey: string;
}

export default function VideoPlayer({ videoKey }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        console.log('Fetching presigned URL for video:', videoKey);
        const response = await fetch(`/api/presigned-url?videoKey=${encodeURIComponent(videoKey)}`);
        if (!response.ok) {
          console.error('API response error:', {
            status: response.status,
            statusText: response.statusText,
            data: await response.json()
          });
          throw new Error('Failed to fetch video URL');
        }
        const data = await response.json();
        setVideoUrl(data.url);
      } catch (err: any) {
        setError('Error loading video');
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
      }
    };

    fetchPresignedUrl();
  }, [videoKey]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!videoUrl) {
    return <div>Loading video...</div>;
  }

  return (
    <video
      className="w-full rounded-lg shadow-lg"
      controls
      src={videoUrl}
      controlsList="nodownload"
    >
      Your browser does not support the video tag.
    </video>
  );
} 