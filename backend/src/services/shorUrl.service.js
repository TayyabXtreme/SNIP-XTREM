import { generateNanoid } from "../utls/helper.js";
import { checkCustomShortUrl, saveShortUrl } from "../dao/shorUrl.js";


export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoid(7);
    if(!shortUrl){
        throw new Error("Short URL generation failed");
    }
    try {
        await saveShortUrl(shortUrl, url);
        return shortUrl;
    } catch (error) {
        throw error; // This will be caught by the controller
    }
}


export const createShortUrlWithUser = async (url, userId, slug=null) => {
    console.log('userId of service', userId);
    const shortUrl = slug ? slug : generateNanoid(7);
    
    if (slug) {
        const exists = await checkCustomShortUrl(shortUrl);
        if (exists) {
            throw new Error("This custom URL already exists");
        }
    }
    
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
}
