import { Router } from "express";
import { loginTeacher, logoutTeacher, registerTeacher, refreshAccessToken, detailsTeacher, getCourses, getTeacherData} from "../controllers/teacher.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    }
  ]),
  registerTeacher
)

router.route("/login").post(loginTeacher)

//secured routes

router.route("/logout").post(verifyJWT, logoutTeacher)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/details").post(upload.fields([
  {
    name: "profilePhoto",
    maxCount: 1,
  }
]),verifyJWT,detailsTeacher)

router.route("/courses").get(verifyJWT,getCourses)

router.route("/data").get(verifyJWT,getTeacherData)

// router.route("/uploadassignment").post(upload.fields([
//   {
//     name: "assignmentFile",
//     maxCount: 1,
//   }
// ]),verifyJWT,assignAssignment)

export default router