import bcrypt from "bcrypt"

export const Hash = async({password,SALT_ROUND= process.env.SALT_ROUND})=>{
    return bcrypt.hashSync(password, Number(SALT_ROUND))
}