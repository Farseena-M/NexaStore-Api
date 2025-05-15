import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../interfaces/userInterface';
import userSchema from '../models/userSchema';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}


export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

        const userId = decoded.id;
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
