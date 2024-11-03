import { Router } from "express";
import { loginTeacher, logoutTeacher, registerTeacher, refreshAccessToken} from "../controllers/teacher.controller.js";
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

export default router