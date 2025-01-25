import jwt from 'jsonwebtoken';
import userModel from '../DB/models/user.model.js';
import { syncHandler } from '../utils/error/errorHandler.js';


export const authentication = syncHandler(async (req, res, next) => {

    const { authorization } = req.headers
    const [prefix, token] = authorization.split(" ") || []

    if (!prefix || !token) {
        return next(new Error("token not found", { cause: 401 }))
    }
    let SIGNATURE = undefined
    if (prefix == "admin") {
        SIGNATURE = process.env.TOKEN_SECRET_ADMIN
    } else if (prefix == 'bearer') {
        SIGNATURE = process.env.TOKEN_SECRET_USER
    } else {
        return next(new Error("Invalid token prefix", { cause: 401 }))
    }
    const decoded = jwt.verify(token, SIGNATURE)
    if (!decoded?.id) {
        return next(new Error("Invalid token payload", { cause: 401 }))
    }
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return next(new Error("User not found", { cause: 401 }))
    }
    if (parseInt(user?.passwordChangedAt.getTime()/1000)>decoded.iat){
        return next(new Error("token expired please login again", { cause:401}))
    }
    if(user?.isDeleted){
        return next(new Error("User is deleted", { cause: 401 }))
    }
    req.user = user
    next()
})

export const authorization = (accessRoles) => {
    return syncHandler(async (req, res, next) => {
        if (!accessRoles.includes(req.user.role)) {
            return next(new Error("Access denied", { cause: 403 }))
        }
        next()
    })
}