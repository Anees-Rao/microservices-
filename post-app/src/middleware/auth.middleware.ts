import { NextFunction, Request, Response } from 'express';
import axios from 'axios';


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token with user-service (adjust URL as needed)
        const response = await axios.post(`${process.env.USER_SERVICE_URL}/verify-jwt`, {
            token,
        });

        if (!response.data || !response.data?.decoded?._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Attach userId to request object for further use
        (req as any).userId = response.data.decoded._id;
        next();
    } catch (error: any) {
        return res.status(error?.response?.status || 500).json({ message: error?.response?.data?.message || error?.message || 'User service error' });
    }
};
