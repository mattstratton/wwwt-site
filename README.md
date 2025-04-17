# S3 Video Player Website

This is a Next.js website that plays videos stored in a private S3 bucket using presigned URLs.

## Features

- Secure video playback from private S3 bucket
- Automatic presigned URL generation
- Responsive HTML5 video player
- TypeScript support
- Tailwind CSS for styling

## Prerequisites

- Node.js 18+ installed
- AWS account with S3 bucket set up
- AWS credentials with appropriate permissions

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables template:
   ```bash
   cp .env.local.example .env.local
   ```
4. Edit `.env.local` and add your AWS credentials and S3 bucket information:
   - `WWWT_AWS_ACCESS_KEY_ID`: Your AWS access key
   - `WWWT_AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `WWWT_AWS_REGION`: The region where your S3 bucket is located
   - `S3_BUCKET_NAME`: The name of your S3 bucket

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add the environment variables in Netlify's dashboard
4. Deploy!

## Usage

To add a video to the list, edit `config/videos.ts`:

```typescript
interface Video {
  id: string;
  title: string;
  description: string;
  filename: string;
  thumbnail: string;
  hidden?: boolean;
}
```

Add your video entry to the `videos` array:

```typescript
{
  id: 'unique-id',
  title: 'Video Title',
  description: 'Video Description',
  filename: 'video-file.mp4', // must match the filename in S3
  thumbnail: '/thumbnails/video-thumbnail.jpg',
  hidden: false // optional, defaults to false
}
```

The `filename` property should match the filename/path of your video in the S3 bucket.

### Thumbnails

Thumbnails should be placed in the `public/thumbnails` directory. You can generate thumbnails from your videos using ffmpeg:

```bash
# Generate a thumbnail from a specific timestamp (e.g., 5 seconds in)
ffmpeg -i video.mp4 -ss 00:00:05 -frames:v 1 public/thumbnails/video-thumbnail.jpg
```

A placeholder thumbnail (`public/thumbnails/placeholder.svg`) is used by default until you add your own thumbnails.

### Hidden Videos

Videos can be hidden from the main library view by setting `hidden: true` in their configuration. Hidden videos are not displayed on the homepage but can still be accessed directly via their URL if you know the video ID.

This is useful for:
- Videos that are not ready to be published
- Content that should only be shared via direct links
- Archival content that shouldn't appear in the main library

## Security Considerations

- Presigned URLs expire after 1 hour
- Make sure your AWS credentials have minimal required permissions
- Keep your `.env.local` file secure and never commit it to version control

## Environment Variables

The following environment variables need to be set:

### AWS Configuration
- `WWWT_AWS_ACCESS_KEY_ID`: Your AWS access key
- `WWWT_AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `WWWT_AWS_REGION`: The AWS region where your S3 bucket is located
- `S3_BUCKET_NAME`: The name of your S3 bucket

### Clerk Authentication
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `CLERK_SECRET_KEY`: Your Clerk secret key 