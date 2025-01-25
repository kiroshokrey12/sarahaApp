import messageModel from "../../DB/models/message.model.js"
import userModel from "../../DB/models/user.model.js"
import { encryption, syncHandler, Hash, compareHash, eventEmitter, generateToken, verifyToken, decrypt } from "../../utils/index.js"


//-----------------------------------------------------[signup]---------------------------------------------------------------------------
export const signup = syncHandler(async (req, res, next) => {

    const { name, email, password, gender, phone } = req.body


    // check email
    const emailExist = await userModel.findOne({ email })
    if (emailExist) {
        return next(new Error("Email already exists", { cause: 400 }))
    }
    // hash password
    const hash = await Hash({ password: password, SALT_ROUND: process.env.SALT_ROUND })
    // encrypt phone
    var cipherText = await encryption({ key: phone, secretKey: process.env.ENCRYPT })

    // send email

    eventEmitter.emit("sendEmail", { email })
    // const emailSender = await sendEmail(email, "Confirm Email", `<a href='${link}'>Confirm Me</a>`)
    // if (!emailSender) {
    //     return next(new Error("Failed to send email", { cause: 400 }))
    // }

    // create
    const user = await userModel.create({ name, email, password: hash, gender, phone: cipherText })
    return res.status(201).json({ msg: "done", user })

})

//-----------------------------------------------------[confirm Email]---------------------------------------------------------------------------

export const confirmEmail = syncHandler(async (req, res, next) => {
    const { token } = req.params
    if (!token) {
        return next(new Error("token not found", { cause: 404 }))
    }
    const decoded = await verifyToken({ token: token, segnture: process.env.SIGNATURE_CONFIRMATION })

    if (!decoded?.email) {
        return next(new Error("Invalid token payload", { cause: 500 }))
    }
    const user = await userModel.findOneAndUpdate(
        { email: decoded.email, confirmed: false },
        { confirmed: true }
    )
    if (!user) {
        return next(new Error("User not found or already confirmed", { cause: 404 }))
    }

    return res.status(201).json({ msg: "done" })

}
)

//-----------------------------------------------------[signin]---------------------------------------------------------------------------
export const signin = syncHandler(async (req, res, next) => {

    const { email, password } = req.body
    // check email
    const user = await userModel.findOne({ email })    //confirmed: true 
    if (!user) {
        return next(new Error("Email not exists or not confirmed yet", { cause: 400 }))
    }
    if(user?.isDeleted){
        return next(new Error("User is deleted", { cause: 401 }))
    }
    // check password
    const match = await compareHash({ password: password, hashed: user.password })
    if (!match) {
        return next(new Error("Invalid password", { cause: 400 }))
    }
    const token = await generateToken({
        payload: { email, id: user._id },
        segnture: user.role == "user" ? process.env.TOKEN_SECRET_USER : process.env.TOKEN_SECRET_ADMIN
    })
    return res.status(201).json({ msg: "done", token })
}
)


//-----------------------------------------------------[get profile]---------------------------------------------------------------------------

export const getProfile = syncHandler(async (req, res, next) => {

    req.user.phone = await decrypt({ key: req.user.phone, secretKey: process.env.ENCRYPT })
    const messages = await messageModel.find({userId:req.user._id})

    return res.status(201).json({ msg: "done", user: req.user , messages})
})

//-----------------------------------------------------[share profile]---------------------------------------------------------------------------

export const shareProfile = syncHandler(async (req, res, next) => {

    const user = await userModel.findById(req.params.id).select("name email phone");
    user ? res.status(201).json({ msg: "done", user }): res.status(404).json({ msg: "user not found" });
})
//-----------------------------------------------------[update profile]---------------------------------------------------------------------------

export const updateProfile = syncHandler(async (req, res, next) => {

    if (req.body.phone) {
        // encrypt phone 
        req.body.phone = await encryption({ key: req.body.phone, secretKey: process.env.ENCRYPT })
    }
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
    return res.status(201).json({ msg: "done", user })
})

//-----------------------------------------------------[update Password profile]---------------------------------------------------------------------------

export const updatePasswordProfile = syncHandler(async (req, res, next) => {
    const {oldPassword, newPassword} =req.body
    // check old password
        if(!await compareHash({password: oldPassword,hashed:req.user.password})){
            return next(new Error("Invalid  old password"))
        }
        const hash = await Hash({password:newPassword,SALT_ROUND:process.env.SALT_ROUND})

    const user = await userModel.findByIdAndUpdate(req.user._id,{password:hash,passwordChangedAt:Date.now()}, { new: true })
    return res.status(201).json({ msg: "password updated successfully" })
})


//-----------------------------------------------------[ freeze acc ]---------------------------------------------------------------------------

export const freezeAcc = syncHandler(async (req, res, next) => {

    const user = await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true}, { new: true })
    return res.status(201).json({ msg: "account deleted ",user })
})

