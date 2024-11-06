import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));

// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//Routes import

import userRouter from './routes/user.routes.js'
import teacherRouter from './routes/teacher.routes.js'
  
app.use("/api/v1/users",userRouter)
app.use("/api/v1/teacher",teacherRouter)

export { app }