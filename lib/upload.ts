import { put } from '@vercel/blob';
import { Readable } from 'stream';

export interface UploadResult {
  url: string;
  pathname: string;
}

export async function uploadFile(
  file: File | Buffer | Readable,
  filename: string,
  folder: string = 'uploads'
): Promise<UploadResult> {
  try {
    const blob = await put(`${folder}/${filename}`, file, {
      access: 'public',
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteFile(pathname: string): Promise<void> {
  try {
    // Vercel Blob doesn't have a direct delete method in the client
    // You may need to use the Vercel API or implement this differently
    // For now, we'll just log it
    console.log('Delete file:', pathname);
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete file');
  }
}

