// routes/user.route.js
import express from "express";
import asyncHandler from "express-async-handler";

import { userSignin } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post("/signin", asyncHandler(userSignin));
// /signin로 POST 요청을 보내면 userSignin이 동작
