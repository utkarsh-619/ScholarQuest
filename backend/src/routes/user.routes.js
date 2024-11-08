import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, detailsUser, getCourses, getUserData, getAllUsers} from "../controllers/user.controller.js";
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
  registerUser
)

router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/details").post(upload.fields([
  {
    name: "profilePhoto",
    maxCount: 1,
  }
]),verifyJWT,detailsUser)

router.route("/courses").get(verifyJWT,getCourses)
router.route("/data").get(verifyJWT,getUserData)
router.route("/lbddata").get(verifyJWT,getAllUsers)

export default router