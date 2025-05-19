import express from 'express';
import dotenv from 'dotenv';


dotenv.config('./.env');
import connectDB from './config/mongo.config.js';
import cors from 'cors'

connectDB();


import auth_Routes from './routes/auth.route.js';
import shortUrlRoute from './routes/shortUrl.route.js';
import { redirectFromShortUrl } from './controller/shorUrl.controller.js';
import { errorHandler } from './utls/errorHandler.js';
import { attachUser } from './utls/attachUser.js';
import cookieParser from 'cookie-parser';



const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    }
))

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(attachUser)

app.use('/api/auth',auth_Routes)
app.use('/api/create',shortUrlRoute)



app.get('/:shortUrl', redirectFromShortUrl);

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});