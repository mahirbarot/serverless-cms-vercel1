import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { hashPassword, generateToken } from '@/lib/auth';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email or username already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const admin = new Admin({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await admin.save();

    const token = generateToken({
      userId: admin._id.toString(),
      email: admin.email,
    });

    return res.status(201).json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

