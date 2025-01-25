import joi from "joi";
import { generalRules } from "../../utils/generalRules/index.js";
import { enumGender } from "../../DB/models/user.model.js";



export const signupSchema = {
    body: joi.object({
        name: joi.string().alphanum().min(3).max(20).messages({
            "string.min": "name is too short"
        }).required(),
        email: generalRules.email.required(),
        password: generalRules.password.required(),
        Cpassword: joi.string().valid(joi.ref("password")).messages({ "any.only": "password not match" }).required(),
        phone: joi.string().regex(/^01[0125][0-9]{8}$/).required(),
        gender: joi.string().valid(enumGender.male, enumGender.female).required()
    })
}

export const signINSchema = {
    body: joi.object({
        email: generalRules.email.required(),
        password: generalRules.password.required(),
    })
}

export const updateSchema = {
    body: joi.object({
        name: joi.string().alphanum().min(3).max(20).messages({
            "string.min": "name is too short"
        }),
        phone: joi.string().regex(/^01[0125][0-9]{8}$/),
        gender: joi.string().valid(enumGender.male, enumGender.female)
    }),
    headers:generalRules.headers.required()
}

export const updatePasswordSchema = {
    body: joi.object({
        oldPassword:generalRules.password.required(),
        newPassword:generalRules.password.required(),
        Cpassword:generalRules.password.valid(joi.ref("newPassword")).messages({ "any.only": "password not match" }).required()
    }),
    headers:generalRules.headers.required()
}

export const freezeAcc = {
    
    headers:generalRules.headers.required()
}

export const shareProfileschema = {
    params: joi.object({
        id:generalRules.ObjectId.required(),
    })}