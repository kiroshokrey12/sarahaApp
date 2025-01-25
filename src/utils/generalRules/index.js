import joi from "joi"
import { Types } from "mongoose"


export const costomId = (value, helper) => {
    let data = Types.ObjectId.isValid(value)
    return data ? value : helper.message("id is not a valid")
}

export const generalRules = {
    ObjectId: joi.string().custom(costomId),
    email: joi.string().email({ tlds: { allow: true } }),
    password: joi.string().min(5),
    headers: joi.object({
        authorization: joi.string().required(),
        "content-type": joi.string(),
        "content-length": joi.string(),
        "user-agent": joi.string(),
        "postman-token": joi.string(),
        "cache-control": joi.string(),
        host: joi.string(),
        accept: joi.string(),
        "accept-encoding": joi.string(),
        connection: joi.string()
    })
}