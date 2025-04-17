'use client';

import { useEffect, useState } from 'react';

interface VideoPlayerProps {
  videoKey: string;
}

export default function VideoPlayer({ videoKey }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        setIsLoading(true);
        setError('');
        console.log('Fetching presigned URL for video:', videoKey);
        const response = await fetch(`/api/presigned-url?videoKey=${encodeURIComponent(videoKey)}`);
        const data = await response.json();
        
        if (!response.ok) {
          console.error('API response error:', {
            status: response.status,
            statusText: response.statusText,
            data
          });
          
          if (response.status === 404) {
            throw new Error('Video not found');
          } else if (response.status === 403) {
            throw new Error('Access denied to video');
          } else if (response.status === 401) {
            throw new Error('Invalid AWS credentials');
          } else {
            throw new Error(data.error || 'Failed to fetch video URL');
          }
        }
        
        if (!data.url) {
          throw new Error('No URL received from server');
        }
        
        // Log URL structure (without exposing the full URL)
        const urlObj = new URL(data.url);
        console.log('Received presigned URL details:', {
          protocol: urlObj.protocol,
          hostname: urlObj.hostname,
          pathname: urlObj.pathname,
          searchParamsCount: Array.from(urlObj.searchParams).length
        });
        
        setVideoUrl(data.url);
      } catch (err: any) {
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
        setError(err.message || 'Failed to load video');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresignedUrl();
  }, [videoKey]);

  if (error) {
    return (
      <div className="text-center p-4">
        <div className="text-red-500 font-medium">{error}</div>
        <p className="text-sm text-gray-600 mt-2">
          If this error persists, please contact support.
        </p>
      </div>
    );
  }

  if (isLoading || !videoUrl) {
    return (
      <div className="flex items-center justify-center aspect-video bg-gray-100">
        <div className="animate-pulse text-gray-600">Loading video...</div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full max-w-4xl mx-auto">
      <video
        className="w-full h-full"
        controls
        playsInline
        src={videoUrl}
        onError={(e) => {
          const videoElement = e.target as HTMLVideoElement;
          console.error('Video loading error:', {
            error: e,
            videoElement: {
              error: videoElement.error?.message,
              errorCode: videoElement.error?.code,
              networkState: videoElement.networkState,
              readyState: videoElement.readyState,
              currentSrc: videoElement.currentSrc ? new URL(videoElement.currentSrc).hostname : null
            }
          });
          setError('Failed to load video. Please try again later.');
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 