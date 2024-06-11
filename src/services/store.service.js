import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {
  addReview,
  getReview,
  addStoreRegion,
  getStoreRegion,
  addMission,
  getMission,
} from "../models/store.dao.js";
import {
  addReviewResponseDTO,
  addMissionResponseDTO,
  addStoreRegionResponseDTO,
} from "../dtos/store.dto.js";

// 특정 지역에 가게 추가
export const joinStoreRegion = async (regionId, body) => {
  try {
    const storeRegionData = await addStoreRegion({
      regionId: regionId,
      name: body.name,
      type: body.type,
      rating: body.rating,
      status: body.status,
      address: body.address,
    });
    if (storeRegionData === -1) {
      throw new BaseError(status.REGION_NOT_EXIST);
    } else {
      // 성공 시
      return addStoreRegionResponseDTO(await getStoreRegion(storeRegionData));
    }
  } catch (err) {
    throw err;
  }
};

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
      storeId: storeId,
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
