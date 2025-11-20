import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Service from '@/models/Service';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const services = await Service.find().sort({ createdAt: -1 });
      return res.status(200).json(services);
    }

    if (req.method === 'POST') {
      const { service_name, service_description, service_icon } = req.body;

      if (!service_name) {
        return res.status(400).json({ error: 'Service name is required' });
      }

      const service = new Service({
        service_name,
        service_description: service_description || '',
        service_icon: service_icon || '',
      });

      await service.save();

      return res.status(201).json(service);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Services items error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

