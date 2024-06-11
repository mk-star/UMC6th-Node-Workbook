import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { modifyMissionStatus } from "../models/mission.dao.js";
import { modifyMissionResponseDTO } from "../dtos/mission.dto.js";

export const modifyMission = async (missionId, body) => {
  try {
    console.log(missionId);
    console.log(body.memberId);
    const missionData = await modifyMissionStatus({
      mission_id: missionId,
      member_id: body.memberId,
    });

    if (missionData === -1) {
      throw new BaseError(status.MISSION_NOT_EXIST);
    } else {
      return modifyMissionResponseDTO(missionData);
    }
  } catch (err) {
    throw err;
  }
};
