import CryptoJS from "crypto-js"


export const encryption= async({key, secretKey=process.env.ENCRYPT})=>{
    return CryptoJS.AES.encrypt(key, secretKey).toString()
}