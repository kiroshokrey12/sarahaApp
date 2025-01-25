import mongoose from "mongoose";

const connectionDB = async ()=>{
    await mongoose.connect(process.env.URI_ONLINE )
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log("Error connecting Database: " + err.message);
    })
}

export default connectionDB;