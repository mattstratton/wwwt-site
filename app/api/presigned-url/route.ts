import { NextResponse } from 'next/server';
import { getPresignedUrl } from '@/utils/s3';
import { currentUser } from '@clerk/nextjs/server';
import getConfig from 'next/config';

export async function GET(request: Request) {
  const { serverRuntimeConfig } = getConfig();
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
    // Log configuration (without sensitive details)
    console.log('Request details:', {
      key,
      bucket: serverRuntimeConfig.S3_BUCKET_NAME,
      region: serverRuntimeConfig.WWWT_AWS_REGION,
      hasAccessKey: !!serverRuntimeConfig.WWWT_AWS_ACCESS_KEY_ID,
      hasSecretKey: !!serverRuntimeConfig.WWWT_AWS_SECRET_ACCESS_KEY
    });

    const url = await getPresignedUrl(key);
    
    if (!url) {
      throw new Error('Generated URL is empty');
    }
    
    // Log URL structure (without exposing the full URL)
    const urlObj = new URL(url);
    console.log('Generated URL details:', {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      pathname: urlObj.pathname,
      searchParamsCount: Array.from(urlObj.searchParams).length
    });

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Error generating presigned URL:', {
      message: error.message,
      code: error.code,
      requestId: error.$metadata?.requestId,
      stack: error.stack,
      // Add AWS specific error details
      region: error.$metadata?.region,
      httpStatusCode: error.$metadata?.httpStatusCode,
    });
    
    const errorResponse = {
      error: 'Failed to generate presigned URL',
      details: {
        message: error.message,
        code: error.code,
        httpStatus: error.$metadata?.httpStatusCode
      }
    };

    // Determine appropriate status code
    let status = 500;
    if (error.code === 'NoSuchKey') status = 404;
    if (error.code === 'AccessDenied') status = 403;
    if (error.code === 'InvalidAccessKeyId') status = 401;
    
    return NextResponse.json(errorResponse, { status });
  }
} 