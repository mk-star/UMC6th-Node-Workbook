import express from "express";
import asyncHandler from "express-async-handler";

import {
  storeReview,
  storeMission,
  storeRegion,
  reviewPreview,
  missionPreview,
} from "../controllers/store.controller.js";

export const storeRouter = express.Router({ mergeParams: true });

// 특정 지역에 가게 추가
storeRouter.post("/add/:regionId", asyncHandler(storeRegion));

// 리뷰 작성
storeRouter.post("/reviews/:storeId", asyncHandler(storeReview));

// 미션 작성
storeRouter.post("/missions/:storeId", asyncHandler(storeMission));

// 특정 가게 리뷰 목록 조회(페이징)
storeRouter.get("/reviews/:storeId", asyncHandler(reviewPreview));

// 특정 가게 미션 목록 조회(페이징)
storeRouter.get("/mission/:storeId", asyncHandler(missionPreview));
