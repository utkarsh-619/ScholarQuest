import mongoose, {mongo, Schema} from "mongoose";
import jwt from "jsonwebtoken" //Jwt is a bearer token.
import bcrypt from "bcrypt"


const userSchema = new Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true,
  },
  auraPoints : {
    type : Number,
    default : 0
  },
  courseEnrollments: [
    {
      courseName: {
        type: String,
        required: true,
        trim: true,
      },
      subjects: [
        {
          subname: {
            type: String,
            required: true,
            trim: true,
          },
          attendedClasses:{
            type: Number,
            required: true,
            default: 0
          } 
          ,
          totalClasses: {
            type: Number,
            required: true,
            default: 0
          },

          chapters : [
            {
              name : {
                type : String,
              },
              isCompleted : {
                type : Boolean,
                default : false
              }
            }
          ],

          // marks: [
          //   {
          //     examName: { type: String, required: true },
          //     score: { type: Number, required: true },
          //     maxScore: { type: Number, required: true }
          //   }
          // ],
          assignments: [
            {
              assignmentName: {
                type: String,
                required: true,
                trim: true,
              },
              assignmentQuestion : {
                type : String,
                default : "",
              },
              assignmentFile : {
                type : String,
                default : "",
              },
              dueDate: {
                type: Date,
              },
              status: {
                type: String,
                enum: ['pending', 'completed'],
                default: 'pending',
              }
            }
          ]
        }
      ]
    }
  ],

  registrationNumber : {
    type : String,
    // required : true,
    lowercase : true,
    trim : true,
    index : true,
  },
  phonenumber : {
    type : String,
    // required : true,
    lowercase : true,
    trim : true,
    index : true,
  },

  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
  },
  
    fname : {
      type : String,
      // required : true,
      trim : true,
      index : true,
    },

    lname : {
      type : String,
      // required : true,
      trim : true,
      index : true,
    },

    address : {
      type : String,
      trim : true,
      index : true,
    },

    role : {
      type : String,
      // required : true,
      trim : true,
      index : true,
    },
  
  profilePhoto : {
    type : String, // Cloudnary url
    // required : true,
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