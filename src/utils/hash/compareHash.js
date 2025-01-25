
import bcrypt from "bcrypt"


export const compareHash = async({password,hashed}) =>{
    return bcrypt.compareSync(password, hashed)
}