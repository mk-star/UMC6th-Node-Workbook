import express from "express";
import asyncHandler from "express-async-handler";

import { missionSuccess } from "../controllers/mission.controller.js";

export const missionRouter = express.Router({ mergeParams: true });

missionRouter.patch("/:missionId", asyncHandler(missionSuccess));
