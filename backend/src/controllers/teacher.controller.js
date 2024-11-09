import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Teacher } from "../models/teacher.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Course } from "../models/course.model.js";



const generateAccessAndRefreshTokens = async(TeacherId)=>{
  try {
    const teacher = await Teacher.findById(TeacherId)
    const accessToken = teacher.generateAccessToken()
    const refreshToken = teacher.generateRefreshToken()

    teacher.refreshToken = refreshToken
    await teacher.save({validateBeforeSave : false})

    return {accessToken,refreshToken}

    
  } catch (error) {
    throw new ApiError(500,"something went wrong while generating refresh and access token")
  }
}



const registerTeacher = asyncHandler (async(req,res) => {
  // take data from teacher;
  // validate the data taken from the teacher.
  // check if teacher already exist.
  // push data in the data base;
  // create 

  const {username,email,role,password} = req.body

  if(
    [email, username, role,password].some((field) => field?.trim() ==="")
  ){
    throw new ApiError(400,"All fields are required.")
  }
  
  const existedTeacher = await Teacher.findOne({
    $or: [{ username },{ email }]
  })

  if(existedTeacher){
    throw new ApiError(409, "Teacher with email or username already exist.")
  }

  // const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path

  // if(!profilePhotoLocalPath){
  //   throw new ApiError(400,"profilePhoto file is required.");
  // }

  // const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);

  // if(!profilePhoto){
  //   throw new ApiError(400,"profilePhoto file is required to upload.");
  // }

  const teacher = await Teacher.create({
    // fullName,
    // profilePhoto : profilePhoto.url,
    email,
    password,
    role,
    username : username.toLowerCase(),
  })

  const createdTeacher = await Teacher.findById(teacher._id).select(
    "-password -refreshToken"
  )
  
  if(!createdTeacher){
    throw new ApiError(500,"Something went wrong while registering the teacher")
  }

  return res.status(201).json(
    new ApiResponse(200, createdTeacher,"Teacher registered Successfully")
  )
})


const loginTeacher = asyncHandler (async(req,res) => {
  //if local refresh token is matched with db then login 
  // else
  //take input from teacher
  //perfrom input validation to avoid db qurrey
  //search for username if username match
  //validate the input taken from teacher and input present in database.
  //match give accesstoken.

  const {email, username, password} = req.body

  if(!username && !email){
    throw new ApiError(400,"username or email is")
  }

  const teacher = await Teacher.findOne({
    $or: [{username},{email}]
  })

  if(!teacher){
    throw new ApiError(404,"Teacher does not exist")
  }

  const isPasswordValid = await teacher.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401,"Invalid teacher credentials")
  }

  const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(teacher._id)

  
  const loggedInTeacher = await Teacher.findById(teacher._id).select("-password -refreshToken")

  const options = {
    httpOnly : true,
    secure : true,
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        teacher: loggedInTeacher,accessToken,refreshToken
      },
      "Teacher logged in Successfully"
    )
  )

})  


const logoutTeacher = asyncHandler(async(req,res) => {
  await Teacher.findByIdAndUpdate(
    req.teacher._id,
    {
      $set:{
        refreshToken : undefined,
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly : true,
    secure : true,
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"Teacher logged Out"))

})


const refreshAccessToken = asyncHandler(async (req,res)=>{
  const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if(incommingRefreshToken) {
    throw new ApiError(401,"Unauthorized Request")
  }

  try {
    const decodedToken = jwt.verify(
      incommingRefreshToken,process.env.REFRESH_TOKEN_SECRET
    )
  
    const teacher = await Teacher.findById(decodedToken?._id)
    
    if(!teacher){
      throw new ApiError(401,"Invalid refresh token")
    }
  
    if(incommingRefreshToken !== teacher?.refreshToken){
      throw new ApiError(401,"Refresh token is expired or used")
    }
  
    const options = {
      httpOnly : true,
      secure : true,
    }
  
    const {accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(teacher._id)
  
    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,refreshToken : newRefreshToken,
        },
        "Access token refreshed"
      )
    )
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid refresh token")
  }

})


const detailsTeacher = asyncHandler (async(req,res) => {
  // take data from teacher;
  // validate the data taken from the user.
  // update the data in the data base for user;
  const {fname,lname,phonenumber,courses} = req.body
  
  // console.log("email ",email);
  
  const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path
  
  var profilePhoto = null;
  if(profilePhotoLocalPath){
    profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);
  }
  const updateData = {};

  // Only add properties to updateData if they are truthy
  if (fname) updateData.fname = fname;
  if (lname) updateData.lname = lname;
  if (courses) updateData.courses = courses;
  if (phonenumber) updateData.phonenumber = phonenumber;
  if (profilePhoto) updateData.profilePhoto = profilePhoto.url;

  // Perform the update
  await Teacher.updateOne({ _id: req.user._id }, {
    fname : updateData.fname,
    lname : updateData.lname,
    phonenumber : updateData.phonenumber,
    profilePhoto : updateData.profilePhoto
  });
  
  return res.status(201).json(
    new ApiResponse(200,"Teacher data updated Successfully")
  )
})

const getCourses = asyncHandler(async(req,res)=>{
  const courses = await Course.find()
  return res.status(200).json(new ApiResponse(200,courses,"Courses fetched successfully"))
})


const getTeacherData = asyncHandler(async(req,res)=>{
  console.log(req.teacher);
  
  const teacher = await Teacher.findById(req.teacher._id)
  return res.status(200).json(new ApiResponse(200,teacher,"Teacher data fetched successfully"))
})
export {registerTeacher,loginTeacher,logoutTeacher,refreshAccessToken,detailsTeacher,getCourses,getTeacherData}