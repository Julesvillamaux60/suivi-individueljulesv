import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const token = req.cookies.auth_token;

    if (token) {
      // Delete session from database
      await prisma.session.deleteMany({
        where: { token },
      });
    }

    // Clear cookie
    res.setHeader('Set-Cookie', 'auth_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');

    return res.status(200).json({ success: true, message: 'Déconnecté' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
