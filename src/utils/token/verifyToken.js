import jwt from 'jsonwebtoken';

export const verifyToken = async({token,segnture=process.env.SIGNATURE_CONFIRMATION})=>{
    return jwt.verify(token, process.env.SIGNATURE_CONFIRMATION)
}