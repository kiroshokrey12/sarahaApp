import CryptoJS from "crypto-js"


export const decrypt=async ({key, secretKey=process.env.ENCRYPT})=>{
    return CryptoJS.AES.decrypt(key, secretKey).toString(CryptoJS.enc.Utf8)
}