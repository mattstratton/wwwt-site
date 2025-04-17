import { NextResponse } from 'next/server';
import { getPresignedUrl } from '@/utils/s3';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  const user = await currentUser();
  
  // Return 401 if not authenticated
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  try {
    console.log('Generating presigned URL for:', key);
    console.log('Using bucket:', process.env.S3_BUCKET_NAME);
    console.log('Using region:', process.env.AWS_REGION);
    
    const url = await getPresignedUrl(key);
    console.log('Successfully generated presigned URL');
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Error generating presigned URL:', {
      message: error.message,
      code: error.code,
      requestId: error.$metadata?.requestId,
    });
    
    return NextResponse.json({
      error: 'Failed to generate presigned URL',
      details: {
        message: error.message,
        code: error.code,
      }
    }, { status: 500 });
  }
} 