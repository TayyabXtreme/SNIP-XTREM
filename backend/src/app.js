import express from 'express';
import dotenv from 'dotenv';

dotenv.config('./.env');
import connectDB from './config/mongo.config.js';

connectDB();
import urlShortener from './models/shorturl.model.js';
import shortUrlRoute from './routes/shortUrl.route.js';
import { redirectFromShortUrl } from './controller/shorUrl.controller.js';
import { errorHandler } from './utls/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/create',shortUrlRoute)



app.get('/:shortUrl', redirectFromShortUrl);

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});