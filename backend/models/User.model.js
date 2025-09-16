import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,//Tranh trung username
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowcase:true
  },
  password:{
    type:String,
    required:true
  },
  address:{
    type:String,
    default:''
  },
  phone:{
    type:Number,
    default:''
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
  
},{
    timestamps:true
  })

export default mongoose.model('User',UserSchema)