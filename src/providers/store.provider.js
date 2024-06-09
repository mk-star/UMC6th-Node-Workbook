import {
  previewReviewResponseDTO,
  previewMissionResponseDTO,
} from "../dtos/store.dto.js";
import { getPreviewReview, getPreviewMission } from "../models/store.dao.js";

export const getReview = async (storeId, query) => {
  const { reviewId, size = 3 } = query;

  return previewReviewResponseDTO(
    await getPreviewReview(reviewId, size, storeId)
  );
};

export const getMission = async (storeId, query) => {
  const { missionId, size = 3 } = query;

  return previewMissionResponseDTO(
    await getPreviewMission(missionId, size, storeId)
  );
};
