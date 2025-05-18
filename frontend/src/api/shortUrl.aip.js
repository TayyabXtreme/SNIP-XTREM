import axiosInstance from "../utils/axiosIntance"


export const createShortUrl=async(url)=>{
    const {data}=await axiosInstance.post('/api/create', { url })
    return data
}