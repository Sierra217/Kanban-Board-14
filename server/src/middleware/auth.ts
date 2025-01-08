import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  const authHeader = req.headers.authorization;

  if (authHeader){
  const token = authHeader && authHeader.split(' ')[1];

  // if (!token) {
  //   return res.status(401).json({ message: 'Missing or invalid access token' });
  // }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access token invalid or expired' });
    }
    req.user = user as JwtPayload;

    return next();
  })
}
else {
  res.sendStatus(401);
}
};


