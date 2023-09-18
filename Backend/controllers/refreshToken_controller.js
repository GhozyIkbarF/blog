import { prismaClient } from "../src/prisma-client.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({message: "Invalid refresh token"});
        const token  = await prismaClient.refreshToken.findUnique({
            where: { token: refreshToken }, 
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        })
        if (!token) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = token.user.id
            const username = token.user.username
            const userEmail= token.user.email
            const accessToken = jwt.sign({userId, username, userEmail}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 5*60*60
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24*60*60*1000,
                // secure: true //untuk htpps
            })
            res.json({
                id: userId,
                username: username,
                email: userEmail,
                accessToken: accessToken
            }); 
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}