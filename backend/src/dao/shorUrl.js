import urlShema from "../models/shorturl.model.js";


export const saveShortUrl=async(shortUrl,longUrl,userId)=>{
    try {
        const newUrl=new urlShema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user_id=userId
        }

        await newUrl.save()
        return newUrl;
    } catch (error) {
        if(error.code === 11000) {
            throw new Error("Short URL already exists");
        }
        throw error;
    }
}


export const getShortUrl=async(shortUrl)=>{
    return await urlShema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
}
