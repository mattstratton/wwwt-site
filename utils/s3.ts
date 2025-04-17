import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import getConfig from 'next/config';

function getS3Client(): S3Client {
  const { serverRuntimeConfig } = getConfig();
  
  const {
    WWWT_AWS_REGION: region,
    WWWT_AWS_ACCESS_KEY_ID: accessKeyId,
    WWWT_AWS_SECRET_ACCESS_KEY: secretAccessKey,
    S3_BUCKET_NAME: bucketName
  } = serverRuntimeConfig;

  if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error('Missing required AWS credentials or configuration');
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function getPresignedUrl(key: string): Promise<string> {
  const { serverRuntimeConfig } = getConfig();
  const bucketName = serverRuntimeConfig.S3_BUCKET_NAME;
  
  if (!bucketName) {
    throw new Error('S3_BUCKET_NAME environment variable is not set');
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    const s3Client = getS3Client();
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
} 