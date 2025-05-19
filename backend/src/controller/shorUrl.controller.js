import { getShortUrl } from "../dao/shorUrl.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shorUrl.service.js";
import wrapAsync from "../utls/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body
    let shortUrl;
    
    console.log('User in request:', req.user)
    
    if (req.user) {
        shortUrl = await createShortUrlWithUser(data.url, req.user._id,data.slug)
    } else {
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    
    res.status(200).json({ shortUrl: `${process.env.APP_URL}/${shortUrl}` })
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


export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})
