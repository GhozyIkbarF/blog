import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createPost, getPosts, getPost, updatePost, deletePost } from '../controllers/post_controller.js';
import multer from 'multer'

const post_router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/images')
    },
    filename: function (req, file, cb) {
    const extention = file.originalname.split('.').pop();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix +'.'+ extention)
    }
  })
  
  const upload = multer({ storage: storage })

// post_router.post('/post', verifyToken, createPost);
// post_router.get('/post/:id', verifyToken, getPost);
// post_router.delete('/post/:id', verifyToken, deletePost);
// post_router.get('/post', verifyToken, getPosts);
// post_router.patch('/post/:id', verifyToken, updatePost);
post_router.post('/post', upload.single('file'), createPost);
post_router.get('/post', getPosts);
post_router.get('/post/:id', getPost);
post_router.patch('/post/edit/:id', upload.single('file'), updatePost);
post_router.delete('/post/delete/:id', deletePost);

export default post_router