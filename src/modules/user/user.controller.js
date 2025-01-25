import { Router } from "express";
import * as US from "./user.service.js";
import { authentication, authorization } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as UV from "./user.validation.js";
const userRouter = Router()



userRouter.post("/signup",validation(UV.signupSchema) ,US.signup)
userRouter.post("/signin",validation(UV.signINSchema), US.signin)
userRouter.get("/confirmEmail/:token", US.confirmEmail)
userRouter.get("/profile", authentication, US.getProfile)
userRouter.get("/:id",validation(UV.shareProfileschema), US.shareProfile)
userRouter.patch("/update",validation(UV.updateSchema), authentication, US.updateProfile)
userRouter.patch("/update/password",validation(UV.updatePasswordSchema), authentication, US.updatePasswordProfile)
userRouter.patch("/freeze",validation(UV.freezeAcc), authentication, US.freezeAcc)



export default userRouter