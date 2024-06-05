import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addReview, getReview } from "../models/store.dao.js";
import { addReviewResponseDTO } from "../dtos/store.dto.js";
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
      // 리뷰 작성 성공 시 작성된 리뷰의 정보를 반환
      return addReviewResponseDTO(await getReview(reviewData));
    }
  } catch (err) {
    throw err;
  }
};
