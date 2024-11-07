import mongoose, {mongo, Schema} from "mongoose";

const courseSchema = new Schema({
  name : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true,
  },

  subjects : [{
    type : String,
    lowercase : true,
  }],

  studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

},{
  timestamps : true
})

export const Course = mongoose.model("Course", courseSchema)