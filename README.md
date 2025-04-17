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

To display a video, use the VideoPlayer component:

```tsx
import VideoPlayer from '@/components/VideoPlayer';

<VideoPlayer videoKey="path/to/your/video.mp4" />
```

The `videoKey` prop should match the key (path) of your video in the S3 bucket.

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