import {EventEmitter}from"events"
import { generateToken } from "../token/index.js"
import { sendEmail } from "../../service/sendEmails.js"
export const eventEmitter= new EventEmitter()

eventEmitter.on("sendEmail",async(data)=>{
    const {email} = data 
    const token = await generateToken({payload:{email},segnture:process.env.SIGNATURE_CONFIRMATION,option:{expiresIn:"10m"}})
    const link = `http://localhost:${process.env.PORT}/users/confirmEmail/${token}`

    await sendEmail(email, "Confirm Email", `<a href='${link}'>Confirm Me</a>`)
})