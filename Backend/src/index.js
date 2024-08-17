import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import expressFileUpload from 'express-fileupload';
import auth_router from '../routers/auth_router.js';
import user_router from '../routers/user_router.js';
import post_router from '../routers/post_router.js';


dotenv.config();
const app = express();
app.disable('X-Powered-By');
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
// app.use(expressFileUpload())

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})
app.use('/api', auth_router)
app.use('/api', user_router)
app.use('/api', post_router)

const port = process.env.PORT;
app.listen(port, () => console.log(`aplication run in port ${port}`));

// module.exports = app;