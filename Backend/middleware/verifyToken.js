import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({message: 'unauthorized'});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({message: 'you dont have access'})
        req.email = decoded.email;
        next();
    })
};