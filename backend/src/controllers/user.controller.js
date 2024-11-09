import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Course } from "../models/course.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, courseId } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists.");
  }

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });

  if (courseId) {
    await enrollUserInCourse(user._id, courseId); // Enroll user in the course
  }

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

const enrollUserInCourse = async (userId, courseId) => {
  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Create the course enrollment structure with subjects and chapters
    const courseEnrollment = {
      courseName: course.name,
      subjects: course.subjects.map((subject) => ({
        subname: subject.name,
        attendedClasses: 0,
        totalClasses: 0,
        assignments: [],
        chapters: subject.chapters.map((chapter) => ({
          name: chapter.name,
          isCompleted: false,
        })),
      })),
    };

    // Check if the user is already enrolled in this course
    const alreadyEnrolled = user.courseEnrollments.some(
      (enrollment) => enrollment.courseName === course.name
    );

    // If not already enrolled, add the course to user's enrollments
    if (!alreadyEnrolled) {
      user.courseEnrollments = courseEnrollment;
      await user.save();
    }
  } catch (error) {
    throw new ApiError(500, "Error enrolling user in course");
  }
};


const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const detailsUser = asyncHandler(async (req, res) => {
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

  await User.updateOne({ _id: req.user._id }, updateData);

  if (courseId) {
    await enrollUserInCourse(req.user._id, courseId);
  }

  const updatedUser = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(
    new ApiResponse(200, updatedUser, "User data updated successfully")
  );
});

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, user, "User data fetched successfully"));
});

//route to get an array of all users , profile photo, aura point and course name
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('username profilePhoto auraPoints courseEnrollments.courseName');
  
  // Format the response
  const formattedUsers = users.map(user => ({
    username: user.username,
    profilePhoto: user.profilePhoto,
    auraPoints: user.auraPoints,
    courseName: user.courseEnrollments[0].courseName
  }));

  return res.status(200).json(new ApiResponse(200, formattedUsers, "Users fetched successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Both current and new passwords are required.");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Verify the current password
  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Current password is incorrect.");
  }

  // Check that the new password is different from the current password
  if (currentPassword === newPassword) {
    throw new ApiError(400, "New password must be different from the current password.");
  }

  // Update the password and reset tokens
  user.password = newPassword;
  user.refreshToken = undefined; // Clear the current refresh token
  await user.save();

  // Generate new tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {}, "Password changed and tokens reset successfully."));
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Delete the user from the database
  await User.findByIdAndDelete(userId);

  const options = {
    httpOnly: true,
    secure: true,
  };

  // Clear authentication cookies
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User account deleted successfully."));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  detailsUser,
  getCourses,
  getUserData,
  getAllUsers,
  changePassword,
  deleteUser
};


