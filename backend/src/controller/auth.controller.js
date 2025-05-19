import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import WrapAsync from "../utls/tryCatchWrapper.js";

export const register_user = WrapAsync(async (req, res) => {
    const {name, email, password} = req.body;
    const {token, user} = await registerUser(name, email, password);
    
    // Set the token as a cookie
    res.cookie("accessToken", token, cookieOptions);
    
    // Return user data without password
    const userData = {
        id: user._id,
        name: user.name,
        email: user.email
    };
    
    res.status(200).json(userData);
});

export const login_user = WrapAsync(async (req, res) => {
    const {email, password} = req.body;
    const {token, user} = await loginUser(email, password);
    
    // Set the token as a cookie
    res.cookie("accessToken", token, cookieOptions);
    
    // Return user data without password
    const userData = {
        id: user._id,
        name: user.name,
        email: user.email
    };
    
    res.status(200).json(userData);
});

export const get_current_user = WrapAsync(async (req, res) => {
    // The authMiddleware already attached the user to the request
    const userData = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };
    
    res.status(200).json(userData);
});

export const logout_user = WrapAsync(async (req, res) => {
    // Clear the cookie
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
});

