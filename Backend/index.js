import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import expressFileUpload from 'express-fileupload';
import user_router from './routers/user_router.js';
import post_router from './routers/post_router.js';


dotenv.config();
const app = express();
app.disable('X-Powered-By');
app.use(cors({ origin: true, credentials: true }));
// app.use(cors());
app.use(cookieParser());;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
// app.use(expressFileUpload())


app.use('/api', user_router)
app.use('/api', post_router)

const port = process.env.PORT;
app.listen(port, () => console.log(`aplication run in port ${port}`));