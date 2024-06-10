import {
  previewReviewResponseDTO,
  previewMissionResponseDTO,
} from "../dtos/user.dto.js";
import { getPreviewReview, getPreviewMission } from "../models/user.dao.js";

export const getReview = async (memberId, query) => {
  const { reviewId, size = 3 } = query;

  return previewReviewResponseDTO(
    await getPreviewReview(reviewId, size, memberId)
  );
};

export const getMission = async (memberId, query) => {
  const { missionId, size = 3 } = query;
  return previewMissionResponseDTO(
    await getPreviewMission(missionId, size, memberId)
  );
};
