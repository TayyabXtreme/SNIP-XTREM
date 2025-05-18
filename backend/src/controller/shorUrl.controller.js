import { getShortUrl } from "../dao/shorUrl.js";
import { createShortUrlWithoutUser } from "../services/shorUrl.service.js";
import wrapAsync from "../utls/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  
        const {url} = req.body;
        const shortUrl = await createShortUrlWithoutUser(url);
        res.send(`${process.env.APP_URL}/${shortUrl}`);

})
   




export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    
  
        const {shortUrl} = req.params;
        const url = await getShortUrl(shortUrl);
        if (!url) {
            return res.status(404).send({
                success: false,
                message: 'URL not found',
            });
        }
        
        console.log(url);
        res.redirect(url.full_url);
        
  

})
