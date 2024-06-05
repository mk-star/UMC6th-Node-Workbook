import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { joinMission } from "../services/mission.service.js";

export const missionAdd = async (req, res, next) => {
  console.log("body:", req.body);

  res.send(response(status.SUCCESS, await joinMission(req.body)));
};
