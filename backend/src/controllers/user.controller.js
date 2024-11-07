import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Course } from "../models/course.model.js";



const generateAccessAndRefreshTokens = async(userId)=>{
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave : false})

    return {accessToken,refreshToken}

    
  } catch (error) {
    throw new ApiError(500,"something went wrong while generating refresh and access token")
  }
}



const registerUser = asyncHandler (async(req,res) => {
  // take data from user;
  // validate the data taken from the user.
  // check if user already exist.
  // push data in the data base;
  // create 

  const {username,email,password} = req.body
  console.log("email ",email);

  if(
    [email, username, password].some((field) => field?.trim() ==="")
  ){
    throw new ApiError(400,"All fields are required.")
  }
  
  const existedUser = await User.findOne({
    $or: [{ username },{ email }]
  })

  if(existedUser){
    throw new ApiError(409, "User with email or username already exist.")
  }

  // const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path

  // if(!profilePhotoLocalPath){
  //   throw new ApiError(400,"profilePhoto file is required.");
  // }

  // const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);

  // if(!profilePhoto){
  //   throw new ApiError(400,"profilePhoto file is required to upload.");
  // }

  const user = await User.create({
    // fullName,
    // profilePhoto : profilePhoto.url,
    email,
    password,
    username : username.toLowerCase(),
  })

  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  
  if(!createduser){
    throw new ApiError(500,"Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createduser,"User registered Successfully")
  )
})


const loginUser = asyncHandler (async(req,res) => {
  //if local refresh token is matched with db then login 
  // else
  //take input from user
  //perfrom input validation to avoid db qurrey
  //search for username if username match
  //validate the input taken from user and input present in database.
  //match give accesstoken.

  const {email, username, password} = req.body

  if(!username && !email){
    throw new ApiError(400,"Username or email is")
  }

  const user = await User.findOne({
    $or: [{username},{email}]
  })

  if(!user){
    throw new ApiError(404,"User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401,"Invalid user credentials")
  }

  const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

  
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

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
        user: loggedInUser,accessToken,refreshToken
      },
      "User logged in Successfully"
    )
  )

})  


const logoutUser = asyncHandler(async(req,res) => {
  await User.findByIdAndUpdate(
    req.user._id,
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
  .json(new ApiResponse(200,{},"User logged Out"))

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
  
    const user = await User.findById(decodedToken?._id)
    
    if(!user){
      throw new ApiError(401,"Invalid refresh token")
    }
  
    if(incommingRefreshToken !== user?.refreshToken){
      throw new ApiError(401,"Refresh token is expired or used")
    }
  
    const options = {
      httpOnly : true,
      secure : true,
    }
  
    const {accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
  
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

const detailsUser = asyncHandler (async(req,res) => {
  // take data from user;
  // validate the data taken from the user.
  // update the data in the data base for user;
  const {fname,lname,registrationNumber,phonenumber,course} = req.body
  console.log(req.body);
  
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
  if (course) updateData.course = course;
  if (registrationNumber) updateData.registrationNumber = registrationNumber;
  if (phonenumber) updateData.phonenumber = phonenumber;
  if (profilePhoto) updateData.profilePhoto = profilePhoto.url;

  // Perform the update
  await User.updateOne({ _id: req.user._id }, updateData);

  const createduser = await User.findById(req.user._id).select(
    "-password -refreshToken"
  )
  
  return res.status(201).json(
    new ApiResponse(200,"User data updated Successfully")
  )
})

const getCourses = asyncHandler(async(req,res)=>{
  const courses = await Course.find()
  return res.status(200).json(new ApiResponse(200,courses,"Courses fetched successfully"))
})

export {registerUser,loginUser,logoutUser,refreshAccessToken,detailsUser,getCourses}