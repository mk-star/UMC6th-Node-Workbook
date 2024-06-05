import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addReview, getReview } from "../models/store.dao.js";
import { addReviewResponseDTO } from "../dtos/store.dto.js";
// 리뷰 작성
export const insertReview = async (storeId, body) => {
  try {
    const reviewData = await addReview({
      memberId: 1,
      storeId: body.store_id,
      score: body.score,
      body: body.body,
    });

    if (reviewData === -1) {
      throw new BaseError(status.STORE_NOT_EXIST);
    } else if (reviewData === -2) {
      throw new BaseError(status.REVIEW_ALREADY_EXIST);
    } else {
      return addReviewResponseDTO(await getReview(createReviewData));
    }
  } catch (err) {
    throw err;
  }
};
