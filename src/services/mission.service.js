import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addMissionResponseDTO } from "../dtos/mission.dto.js";
import { addMission, getMission } from "../models/mission.dao.js";

export const joinMission = async (body) => {
  try {
    const addMissionData = await addMission({
      store_id: body.store_id,
      price: body.price,
      point: body.point,
      deadline: body.deadline,
    });

    if (addMissionData === -1) {
      throw new BaseError(status.STORE_NOT_EXIST);
    }

    return addMissionResponseDTO(await getMission(addMissionData));
  } catch (err) {
    throw err;
  }
};
