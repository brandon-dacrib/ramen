import { Request, Response, NextFunction } from 'express';
import { verifySupabaseToken, extractTokenFromHeader, getUserProfile, isAdmin } from '../utils/auth';
import { User } from '@supabase/supabase-js';

export interface AuthRequest extends Request {
  user?: User;
  userProfile?: any;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const user = await verifySupabaseToken(token);
    
    if (!user) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Get user profile from our custom users table
    const userProfile = await getUserProfile(user.id);
    
    req.user = user;
    req.userProfile = userProfile;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({ error: 'Authentication failed' });
  }
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const isUserAdmin = await isAdmin(req.user.id);
    
    if (!isUserAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ error: 'Authorization check failed' });
  }
};