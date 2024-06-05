import express from "express";
import asyncHandler from "express-async-handler";

import {
  storeReview,
  storeMission,
  storeRegion,
} from "../controllers/store.controller.js";

export const storeRouter = express.Router({ mergeParams: true });

// 특정 지역에 가게 추가
storeRouter.post("/add/:regionId", asyncHandler(storeRegion));

// 리뷰 작성
storeRouter.post("/reviews/:storeId", asyncHandler(storeReview));

// 미션 작성
storeRouter.post("/missions/:storeId", asyncHandler(storeMission));
