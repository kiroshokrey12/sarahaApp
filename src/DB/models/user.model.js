import mongoose from "mongoose"

export const roleTypes = {
    admin: 'admin',
    user: 'user'
}

export const enumGender = {
    male: 'male',
    female: 'female'
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: Object.values(enumGender)
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(roleTypes),
        default: roleTypes.male
    },
    passwordChangedAt : Date,
    isDeleted:{
        type: Boolean,
        default: false 
    }
}, {
    timestamps: true
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)

export default userModel