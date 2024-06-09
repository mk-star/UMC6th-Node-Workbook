import { previewReviewResponseDTO } from "../dtos/user.dto.js";
import { getPreviewReview } from "../models/user.dao.js";
export const getReview = async (memberId, query) => {
  const { reviewId, size = 3 } = query;

  return previewReviewResponseDTO(
    await getPreviewReview(reviewId, size, memberId)
  );
};
