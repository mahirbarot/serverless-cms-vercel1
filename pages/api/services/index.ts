import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Services from '@/models/Services';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let services = await Services.findOne();

      if (!services) {
        services = new Services();
        await services.save();
      }

      return res.status(200).json(services);
    }

    if (req.method === 'PUT') {
      const { services_title } = req.body;

      let services = await Services.findOne();

      if (!services) {
        services = new Services();
      }

      if (services_title !== undefined) services.services_title = services_title;

      await services.save();

      return res.status(200).json(services);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Services error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

