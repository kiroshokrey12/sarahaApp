import jwt from 'jsonwebtoken';

export const verifyToken = async({token,segnture=TOKEN_SECRET_USER})=>{
    return jwt.verify(token, segnture)
}