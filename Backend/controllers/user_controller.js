import bcrypt from 'bcrypt';
import { prismaClient } from '../src/prisma-client.js'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    const { name, username, email, photo_profile, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                username: username,
                photo_profile: photo_profile,
                password: hashedPassword,
            },
        })
        res.set(
            {
                'Content-Type': 'application/json'
            },
        )
        res.status(201).json({
            data: user,
            message: 'Create user is successfully created'
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await prismaClient.user.findUnique({
            where: { email: email },
            include:{
                refresh_token: {
                    select: {
                        userId: true,
                    }
                }
            }
        });
        if (!user) return res.status(404).json('email is wrong' );
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(404).json({ error: 'password is wrong' })
        const userId = user.id
        const name = user.name
        const username = user.username
        const userEmail= user.email
        // let photoProfile = ""
        // if(user.photo_profile !== null) photoProfile = user.photo_profile
        const accessToken = jwt.sign({userId, name, username, userEmail}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 5*60
        })
        const refreshToken = jwt.sign({userId, name, username, userEmail}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        if(user.refresh_token !== null){
            await prismaClient.refreshToken.update({
                where: { userId: user.id },
                data: {
                    token: refreshToken
                }
            })
        }else{
            await prismaClient.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: user.id
                }
            })
        }
        res.cookie('refreshToken', refreshToken, {
            path: '/',
            maxAge: 24*60*60*1000,
            httpOnly: true, 
            // secure: true,   
            // sameSite: 'strict', 
        })
        res.json({
            photoProfile: user.photo_profile,
            accessToken: accessToken
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the record.' });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken 
    if(!refreshToken) return res.sendStatus(204)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
    })
    try {
        const user = await prismaClient.refreshToken.findUnique({
            where: { token: refreshToken },
        });

        if (!user) return res.sendStatus(204)
        await prismaClient.refreshToken.delete({
            where: { token: refreshToken }
        })
        res.clearCookie('refreshToken');
        res.status(200).json({message: 'logout is successful'}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the record.' });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params; 

    try {
        const record = await prismaClient.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                username: true,
                email: true
            }
        });

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json(record); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the record.' });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password } = req.body;

    try {
        let updateData = { name, username, email };
        const user = await prismaClient.user.findUnique({
            where: { id: parseInt(id) },
            select: { password: true}
        });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(404).json('password is wrong' );
        const updatedUser = await prismaClient.user.update({
            where: { id: parseInt(id) },
            data: updateData,
            select: {
                name: true,
                username: true,
                email: true,
            }
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
}
export const deleteUser = (req, res) => {
    try {
        // const res = await
    } catch (err) {
        console.log(err.message);
    }
}