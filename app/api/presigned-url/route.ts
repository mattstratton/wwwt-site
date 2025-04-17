import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const s3Client = new S3Client({
  region: serverRuntimeConfig.WWWT_AWS_REGION,
  credentials: {
    accessKeyId: serverRuntimeConfig.WWWT_AWS_ACCESS_KEY_ID,
    secretAccessKey: serverRuntimeConfig.WWWT_AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoKey = searchParams.get('videoKey');

    console.log('Received request for video:', { videoKey });

    if (!videoKey) {
      console.error('Missing videoKey parameter');
      return NextResponse.json({ error: 'Video key is required' }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: serverRuntimeConfig.S3_BUCKET_NAME,
      Key: videoKey,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log('Generated presigned URL for:', { videoKey });
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate presigned URL' },
      { status: 500 }
    );
  }
} 