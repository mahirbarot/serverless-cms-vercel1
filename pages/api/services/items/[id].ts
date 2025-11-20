import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Service from '@/models/Service';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    const { id } = req.query;

    if (req.method === 'GET') {
      const service = await Service.findById(id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      return res.status(200).json(service);
    }

    if (req.method === 'PUT') {
      const { service_name, service_description, service_icon } = req.body;

      const service = await Service.findById(id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      if (service_name !== undefined) service.service_name = service_name;
      if (service_description !== undefined) service.service_description = service_description;
      if (service_icon !== undefined) service.service_icon = service_icon;

      await service.save();

      return res.status(200).json(service);
    }

    if (req.method === 'DELETE') {
      const service = await Service.findByIdAndDelete(id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      return res.status(200).json({ message: 'Service deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Service item error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

