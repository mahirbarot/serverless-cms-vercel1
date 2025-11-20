import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    const { id } = req.query;

    if (req.method === 'GET') {
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      return res.status(200).json(project);
    }

    if (req.method === 'PUT') {
      const {
        project_title,
        project_cover_image,
        project_thumbnail_image,
        project_description,
        project_year,
        project_category,
        project_link,
        project_type,
        project_tags,
      } = req.body;

      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      if (project_title !== undefined) project.project_title = project_title;
      if (project_cover_image !== undefined) project.project_cover_image = project_cover_image;
      if (project_thumbnail_image !== undefined) project.project_thumbnail_image = project_thumbnail_image;
      if (project_description !== undefined) project.project_description = project_description;
      if (project_year !== undefined) project.project_year = project_year;
      if (project_category !== undefined) project.project_category = project_category;
      if (project_link !== undefined) project.project_link = project_link;
      if (project_type !== undefined) project.project_type = project_type;
      if (project_tags !== undefined) project.project_tags = project_tags;

      await project.save();

      return res.status(200).json(project);
    }

    if (req.method === 'DELETE') {
      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      return res.status(200).json({ message: 'Project deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Project item error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

