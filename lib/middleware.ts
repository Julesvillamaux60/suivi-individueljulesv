import { verifyToken } from './auth';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: { userId: string; role: string };
}

// Middleware to verify authentication
export function withAuth(handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Token invalide' });
    }

    req.user = decoded;
    return handler(req, res);
  };
}

// Middleware to verify roles
export function withRole(...allowedRoles: string[]) {
  return (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
    return withAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès refusé' });
      }
      return handler(req, res);
    });
  };
}
