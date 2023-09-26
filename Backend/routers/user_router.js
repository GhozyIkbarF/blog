import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { refreshToken } from '../controllers/refreshToken_controller.js';
import { createUserMiddleware } from '../middleware/register_middleware.js';
import { register, getUser, updateUser, login, logout } from '../controllers/user_controller.js';

const user_router = express.Router();

user_router.post('/login', login);
user_router.delete('/logout', logout);
user_router.post('/register', createUserMiddleware, register);
// user_router.post('/register', register);
user_router.get('/token', refreshToken);
user_router.get('/user/:id', verifyToken, getUser)
user_router.patch('/user/edit/:id', updateUser);
// user_router.patch('/user/edit/:id', verifyToken, updateUser);

export default user_router;