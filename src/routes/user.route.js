import express from "express";
import asyncHandler from "express-async-handler";

import {
  userSignin,
  memberMission,
  reviewPreview,
  missionPreview,
} from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post("/signin", asyncHandler(userSignin));

userRouter.post("/missions/:missionId", asyncHandler(memberMission));

userRouter.get("/reviews/:memberId", asyncHandler(reviewPreview));

// 내가 진행 중인 미션 목록
userRouter.get("/missions/:memberId", asyncHandler(missionPreview));
