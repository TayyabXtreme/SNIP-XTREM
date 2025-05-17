import express from 'express';
import {nanoid} from 'nanoid';
import dotenv from 'dotenv';

dotenv.config('./.env');
import connectDB from './config/mongo.config.js';

connectDB();
import urlShortener from './models/shorturl.model.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/api/create', (req, res) => {
    try {
        const {url}=req.body;
    const shortUrl = nanoid(6);
    const newUrl = new urlShortener({
        full_url: url,
        short_url: shortUrl,
    });
    newUrl.save()
    res.send({
        success: true,
        message: 'URL shortened successfully',
        data: {
            full_url: url,
            short_url: `${shortUrl}`,
        },
    });
        
    } catch (error) {
        console.error(error);
    }
});

app.get('/:shortUrl', async (req, res) => {
    try {
        const {shortUrl} = req.params;
        const url = await urlShortener.findOne({short_url: shortUrl});
        if (!url) {
            return res.status(404).send({
                success: false,
                message: 'URL not found',
            });
        }
        url.clicks += 1;
        await url.save();
        res.redirect(url.full_url);
        
    } catch (error) {
        console.error(error);
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});