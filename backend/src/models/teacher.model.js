import mongoose, {mongo, Schema} from "mongoose";
import jwt from "jsonwebtoken" //Jwt is a bearer token.
import bcrypt from "bcrypt"


const teacherSchema = new Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true,
  },

  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
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
          totalClasses: {
            type: Number,
            required: true,
            default: 0
          },

          assignments: [
            {
              assignmentName: {
                type: String,
                required: true,
                trim: true,
              },
              dueDate: {
                type: Date,
              },
              assignmentFile : {
                type : String,
              }
            }
          ]
        }
      ]
    }
  ],

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
  
  role : {
    type : String,
    trim : true,
    required : true,
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

teacherSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10)
  next()
})

teacherSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

teacherSchema.methods.generateAccessToken = function(){
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
teacherSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id,
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
   }
  )
}

export const Teacher = mongoose.model("Teacher", teacherSchema)