import mongoose, {mongo, Schema} from "mongoose";
import jwt from "jsonwebtoken" //Jwt is a bearer token.
import bcrypt from "bcrypt"
import { object } from "mongoose/lib/utils";


const userSchema = new Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true,
  },

  course : {
    type : String,
    required : true,
    lowercase : true,
    trim : true,
    index : true,
  },

  assignments: [
    {
      subjectName: {
        type: String,
        required: true,
        trim: true, // Removes any extra spaces
      },
      assignmentName: {
        type: String,
        required: true,
        trim: true,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],

  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
  },
  
    fullName : {
      type : String,
      required : true,
      trim : true,
      index : true,
    },
  
  profilePhoto : {
    type : String, // Cloudnary url
    required : true,
  },

  password : {
    type : String,
    required : [true, 'Password is required']
  },

  refreshToken : {
    type : String,
  }

},{
  timestamps : true
})

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
    _id: this._id,
    email : this.email,
    username : this.username,
    fullname : this.fullName,
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY 
   }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id,
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
   }
  )
}

export const User = mongoose.model("User", userSchema)