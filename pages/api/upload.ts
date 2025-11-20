import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = await req.body;
    const file = formData.file;
    const folder = formData.folder || 'uploads';

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Handle base64 or file buffer
    let fileBuffer: Buffer;
    let filename: string;

    if (typeof file === 'string') {
      // Base64 string
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      fileBuffer = Buffer.from(base64Data, 'base64');
      filename = formData.filename || `image-${Date.now()}.png`;
    } else {
      // File buffer
      fileBuffer = file;
      filename = formData.filename || `file-${Date.now()}`;
    }

    const blob = await put(`${folder}/${filename}`, fileBuffer, {
      access: 'public',
    });

    return res.status(200).json({
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
}

export default authenticate(handler);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// For Next.js 13+ App Router, you might need to use a different approach
// This endpoint works with base64 encoded files or file buffers sent as JSON

