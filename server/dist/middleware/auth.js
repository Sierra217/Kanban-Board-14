import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader && authHeader.split(' ')[1];
        // if (!token) {
        //   return res.status(401).json({ message: 'Missing or invalid access token' });
        // }
        const secretKey = process.env.JWT_SECRET_KEY || '';
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Access token invalid or expired' });
            }
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
