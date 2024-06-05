import express from "express";
import asyncHandler from "express-async-handler";

import { storeReview } from "../controllers/store.controller.js";
import { storeMission } from "../controllers/store.controller.js";

export const storeRouter = express.Router({ mergeParams: true });

// 리뷰 작성
storeRouter.post("/reviews/:storeId", asyncHandler(storeReview));

// 미션 작성
storeRouter.post("/missions/:storeId", asyncHandler(storeMission));
