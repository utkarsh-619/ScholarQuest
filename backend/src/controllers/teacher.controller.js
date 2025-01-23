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

const enrollUserInCourse = async (userId, courseId) => {
  // console.log(userId, courseId);
  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    // Find the teacher by ID
    const teacher = await Teacher.findById(userId);
    if (!teacher) {
      throw new ApiError(404, "Teacher not found");
    }
    
    // Validate course structure
    if (!Array.isArray(course.subjects)) {
      throw new ApiError(500, "Course subjects are invalid");
    }

    // Prepare the course enrollment structure
    const courseEnrollment = {
      courseId: course._id,
      courseName: course.name,
      subjects: course.subjects.map((subject) => ({
        subname: subject.name,
        totalClasses: 0,
        assignments: [],
      })),
    };

    // Check if the teacher is already enrolled in this course
    // console.log();
    
    const alreadyEnrolled = teacher.courses.some(
      (enrollment) => enrollment.courseName === course.name
    );

    if (!alreadyEnrolled) {
      // Add teacher to the course's studentsEnrolled if not already present
      if (!course.studentsEnrolled.includes(userId)) {
        course.studentsEnrolled.push(userId);
      }

      // Add the course enrollment to the teacher's enrollments
      teacher.courses.push(courseEnrollment);

      // Save both the teacher and the course
      await course.save();
      await teacher.save();
    } else {
      throw new ApiError(400, "Teacher is already enrolled in this course");
    }
  } catch (error) {
    console.error("Error enrolling teacher in course:", error);
    throw new ApiError(500, `Error enrolling teacher in course: ${error.message}`);
  }
};


const detailsTeacher = asyncHandler(async (req, res) => {
  const { fname, lname, registrationNumber, phonenumber, courseId } = req.body;

  let profilePhoto = null;
  if (req.files?.profilePhoto && req.files.profilePhoto.length > 0) {
    const profilePhotoLocalPath = req.files.profilePhoto[0].path;

    // Upload profile photo if a path is available
    profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);
  }

  const updateData = {};
  if (fname) updateData.fname = fname;
  if (lname) updateData.lname = lname;
  if (registrationNumber) updateData.registrationNumber = registrationNumber;
  if (phonenumber) updateData.phonenumber = phonenumber;
  if (profilePhoto) updateData.profilePhoto = profilePhoto.url;

  await Teacher.updateOne({ _id: req.teacher._id }, updateData);

  if (courseId) {
    
    await enrollUserInCourse(req.teacher._id, courseId);
  }

  const updatedUser = await Teacher.findById(req.teacher._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(
    new ApiResponse(200, updatedUser, "Teacher data updated successfully")
  );
});
const getCourses = asyncHandler(async(req,res)=>{
  const courses = await Course.find()
  return res.status(200).json(new ApiResponse(200,courses,"Courses fetched successfully"))
})


const getTeacherData = asyncHandler(async(req,res)=>{
  console.log(req.teacher);
  
  const teacher = await Teacher.findById(req.teacher._id)
  return res.status(200).json(new ApiResponse(200,teacher,"Teacher data fetched successfully"))
})

const assignAssignment = asyncHandler(async (req, res) => {
  const { courseId, subjectName, assignmentName, dueDate } = req.body;

  if (!courseId || !subjectName || !assignmentName || !dueDate) {
    throw new ApiError(400, "Course ID, subject name, and assignment name are required.");
  }

  // Check if there's an uploaded file and get its Cloudinary URL
  let assignmentFile = null;
  if (req.files?.assignmentFile && req.files.assignmentFile.length > 0) {
    const assignmentFileLocalPath = req.files.assignmentFile[0].path;
    assignmentFile = await uploadOnCloudinary(assignmentFileLocalPath);
  }

  // Find the course
  // console.log(courseId);
  
  const ccourse = await Course.findById(courseId);
  const course = await ccourse.populate("studentsEnrolled");
  console.log(course);
  
  if (!course) {
    throw new ApiError(404, "Course not found.");
  }

  // Find the subject within the course
  const subject = course.subjects.find(s => s.name === subjectName.toLowerCase());
  if (!subject) {
    throw new ApiError(404, "Subject not found.");
  }

  // Check if the assignment already exists
  const existingAssignment = subject.assignments?.find(a => a.assignmentName === assignmentName);
  if (existingAssignment) {
    throw new ApiError(400, "Assignment with this name already exists.");
  }

  // Create a new assignment
  const newAssignment = {
    assignmentName,
    dueDate: new Date(dueDate),
    assignmentFile: assignmentFile?.url || null,
  };

  // Add the assignment to the course's subject
  if (!subject.assignments) {
    subject.assignments = [];
  }
  subject.assignments.push(newAssignment);

  // Save the updated course
  await course.save();

  // Update the teacher's record
  const teacher = await Teacher.findById(req.teacher._id);
  if (!teacher) {
    throw new ApiError(404, "Teacher not found.");
  }

  const teacherCourse = teacher.courses.find(c => c.courseId.toString() === courseId);
  if (!teacherCourse) {
    throw new ApiError(404, "Teacher's course not found.");
  }

  const teacherSubject = teacherCourse.subjects.find(s => s.subname === subjectName);
  if (!teacherSubject) {
    throw new ApiError(404, "Teacher's subject not found.");
  }

  if (!teacherSubject.assignments) {
    teacherSubject.assignments = [];
  }
  teacherSubject.assignments.push(newAssignment);
  await teacher.save();

  // Update the students' records
  for (const student of course.studentsEnrolled) {
    const studentCourse = student.courseEnrollments.find(c => c.courseName === course.name);
    const studentSubject = studentCourse?.subjects.find(s => s.subname === subjectName);

    if (studentSubject) {
      studentSubject.assignments.push({
        assignmentName,
        dueDate: new Date(dueDate),
        assignmentFile: "",
        assignmentQuestion: assignmentFile?.url || null,
        status: 'pending',
      });
      await student.save();
    }
  }

  return res.status(200).json(new ApiResponse(200, {}, "Assignment assigned successfully."));
});





export {registerTeacher,loginTeacher,logoutTeacher,refreshAccessToken,detailsTeacher,getCourses,getTeacherData,assignAssignment}