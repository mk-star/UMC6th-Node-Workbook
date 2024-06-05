import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addReview, getReview } from "../models/store.dao.js";
import { addReviewResponseDTO } from "../dtos/store.dto.js";
import { addMission, getMission } from "../models/store.dao.js";
import { addMissionResponseDTO } from "../dtos/store.dto.js";

// 리뷰 작성
export const joinReview = async (storeId, body) => {
  try {
    const reviewData = await addReview({
      memberId: 1,
      storeId: storeId,
      score: body.score,
      body: body.body,
    });

    if (reviewData === -1) {
      throw new BaseError(status.STORE_NOT_EXIST);
    } else if (reviewData === -2) {
      throw new BaseError(status.REVIEW_ALREADY_EXIST);
    } else {
      // 성공 시
      return addReviewResponseDTO(await getReview(createReviewData));
    }
  } catch (err) {
    throw err;
  }
};

// 미션 작성
export const joinMission = async (storeId, body) => {
  try {
    const missionData = await addMission({
      store_id: storeId,
      price: body.price,
      point: body.point,
      deadline: body.deadline,
    });

    if (missionData === -1) {
      throw new BaseError(status.STORE_NOT_EXIST);
    } else {
      // 성공 시
      return addMissionResponseDTO(await getMission(missionData));
    }
  } catch (err) {
    throw err;
  }
};
