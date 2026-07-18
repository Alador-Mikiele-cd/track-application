import {Schema , models , model} from 'mongoose'
import { timeStamp } from 'node:console'

const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timeStamp:true})

const User = models.User || model('User',userSchema)
export default User