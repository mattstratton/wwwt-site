'use client';

import { useEffect, useState } from 'react';

interface VideoPlayerProps {
  videoKey: string;
}

export default function VideoPlayer({ videoKey }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        console.log('Fetching presigned URL for:', videoKey);
        const response = await fetch(`/api/presigned-url?key=${encodeURIComponent(videoKey)}`);
        const data = await response.json();
        
        if (!response.ok) {
          console.error('API response error:', data);
          throw new Error(data.error || 'Failed to fetch video URL');
        }
        
        console.log('Received presigned URL:', data.url);
        setVideoUrl(data.url);
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load video');
      }
    };

    fetchPresignedUrl();
  }, [videoKey]);

  if (error) {
    return (
      <div className="text-red-500">
        <p>{error}</p>
        <p className="text-sm mt-2">Check browser console for detailed error information.</p>
      </div>
    );
  }

  if (!videoUrl) {
    return <div className="animate-pulse">Loading video...</div>;
  }

  return (
    <div className="aspect-video w-full max-w-4xl mx-auto">
      <video
        className="w-full h-full"
        controls
        playsInline
        src={videoUrl}
        onError={(e) => {
          console.error('Video loading error:', e);
          setError('Failed to load video from S3');
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 