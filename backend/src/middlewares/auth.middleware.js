import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { Teacher } from "../models/teacher.model.js";

export const verifyJWT = asyncHandler(async (req,_,next) =>{
  
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
  
    if(!token){
      throw new ApiError(401,"Unauthorized request")
    }
  
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    console.log();
    const teacher = await Teacher.findById(decodedToken?._id).select("-password -refreshToken")
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if(!user && !teacher){
      throw new ApiError(401,"Invalid Access Token")
    }
    user?req.user = user : req.teacher = teacher
    next()
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid access token")
  }

})