import express from "express";
import asyncHandler from "express-async-handler";
import { missionAdd } from "../controllers/mission.controller.js";

export const missionRouter = express.Router();

missionRouter.post("/add", asyncHandler(missionAdd));
