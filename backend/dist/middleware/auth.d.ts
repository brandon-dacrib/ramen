import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from '../utils/auth';
export interface AuthRequest extends Request {
    user?: JWTPayload;
}
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const requireAdmin: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map