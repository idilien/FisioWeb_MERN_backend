import mongoose from "mongoose";
import bcrypt from "bcrypt"
import generateId from "../helpers/generateId.js";

const physioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
       type: String,
       default: generateId(),
    },
    confirm: {
        type: Boolean,
        default: false
    },
});

physioSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

physioSchema.methods.checkPassword = async function (passwordForm){
    return await bcrypt.compare(passwordForm, this.password)
}


const PhysioModel = mongoose.model("PhysioModel", physioSchema);
export default PhysioModel;