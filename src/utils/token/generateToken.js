import jwt from 'jsonwebtoken';

export const generateToken = ({ payload = {}, segnture, option = { expiresIn: '3h' } }) => {
    return jwt.sign(
        payload,
        segnture,
        option
    )
}