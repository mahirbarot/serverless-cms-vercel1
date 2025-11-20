import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Services from '@/models/Services';
import Service from '@/models/Service';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    let servicesSection = await Services.findOne();
    if (!servicesSection) {
      servicesSection = new Services();
      await servicesSection.save();
    }

    const services = await Service.find().sort({ createdAt: -1 });

    return res.status(200).json({
      ...servicesSection.toObject(),
      items: services,
    });
  } catch (error) {
    console.error('Services error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

