import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { modifyMission } from "../services/mission.service.js";

export const missionSuccess = async (req, res, next) => {
  console.log("진행 중인 미션 진행 완료로 바꾸기를 요청하였습니다!");
  console.log("body:", req.body);

  return res.send(
    response(
      status.SUCCESS,
      await modifyMission(req.params.missionId, req.body)
    )
  );
};
