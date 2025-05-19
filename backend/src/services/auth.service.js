
import { createUser, findUserByEmail } from '../dao/user.dao.js';
import { ConflictError } from '../utls/errorHandler.js';
import { signToken } from '../utls/helper.js';

export const registerUser = async (name, email, password) => {
    try {
        const user = await findUserByEmail(email);
    if (user) {
        throw new ConflictError('User already exists');
    }
    const newUser = await createUser(name, email, password);
    const token =await signToken({ id: newUser._id });
    return  {token,user}
        
    } catch (error) {
        throw error;
        
    }
}


export const loginUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        if (!user || user.password !== password) {
            throw new Error('Invalid credentials');
        }
        const token =await signToken({ id: user._id });
        return  {token,user}
    } catch (error) {
        throw error;
    }
}