import express from "express";
import asyncHandler from "express-async-handler";

import {
  userSignin,
  memberMission,
  reviewPreview,
} from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post("/signin", asyncHandler(userSignin));

userRouter.post("/missions/:missionId", asyncHandler(memberMission));

userRouter.get("/reviews/:memberId", asyncHandler(reviewPreview));
