import type { NextApiResponse } from 'next';
import { withRole } from '@/lib/middleware';
import { prisma } from '@/lib/db';
import type { AuthenticatedRequest } from '@/lib/middleware';

const handler = withRole('ADMIN')(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
        },
      });

      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { userId, role } = req.body;

      if (!userId || !role) {
        return res.status(400).json({ error: 'userId et role requis' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      });

      return res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
});

export default handler;
