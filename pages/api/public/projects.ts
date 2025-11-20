import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Projects from '@/models/Projects';
import Project from '@/models/Project';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    let projectsSection = await Projects.findOne();
    if (!projectsSection) {
      projectsSection = new Projects();
      await projectsSection.save();
    }

    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      ...projectsSection.toObject(),
      items: projects,
    });
  } catch (error) {
    console.error('Projects error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

