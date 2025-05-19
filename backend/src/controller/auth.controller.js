import { cookieOptions } from "../config/config.js";
import { registerUser } from "../services/auth.service.js";
import WrapAsync from "../utls/tryCatchWrapper.js";

export const register_user = WrapAsync(async (req, res) => {
    //add jwt register
    const {name, email, password} = req.body;
    const {token,user} = await registerUser(name, email, password);
    req.user=user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({message:"register success"})

    
}
)



export const login_user = WrapAsync(async (req, res) => {
    res.send('Login');
})

