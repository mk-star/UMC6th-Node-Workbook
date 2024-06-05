// temp.route.js
import express from "express";
import { tempTest } from "../controllers/temp.controller.js";
import { tempException } from "../controllers/temp.controller.js";

export const tempRouter = express.Router();

tempRouter.get("/test", tempTest);
// 해당 경로의 통신을 가능하게 만들어줌

tempRouter.get("/exception/:flag", tempException);
// flag의 파라미터를 얻어옴
