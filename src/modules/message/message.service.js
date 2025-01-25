import messageModel from "../../DB/models/message.model.js";
import userModel from "../../DB/models/user.model.js";
import { syncHandler } from "../../utils/index.js";

//-----------------------------------------------------[send message]---------------------------------------------------------------------------

export const sendMessage = syncHandler(async(req,res,next)=>{
    const {content,userId}=req.body;
    if(! await userModel.findOne({_id:userId , isDeleted:false})){
        return next(new Error("User not found",{cause:404}))
    }
    const message = await messageModel.create({content,userId})
    return res.status(200).json({msg:"message sent successfully",message})
})

//-----------------------------------------------------[get messages]---------------------------------------------------------------------------

export const getMessage = syncHandler(async(req,res,next)=>{
    const messages = await messageModel.find({userId:req.user._id}).populate("userId","name email");
    return res.status(200).json({msg:"done",messages})
})