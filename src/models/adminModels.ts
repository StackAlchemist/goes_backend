import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { isEmail } from "validator";

const adminSchema = new mongoose.Schema({
    name: { type: String, require: true},
    email: { type: String, required: true, unique: true, lowercase: true, validator: [isEmail, 'please enter a valid email'] },
    password: { type: String, required: true },
});


const saltRounds: number = 10;

adminSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})


adminSchema.post('save', async function (doc, next){
    console.log('user created', doc);
    next();
})


adminSchema.statics.login = async function (email, password){
    const user = await Admin.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('Wrong Credentials')
    } throw Error('User does not exist') 
}

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
