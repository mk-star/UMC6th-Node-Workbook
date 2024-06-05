import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {
  confirmStore,
  confirmReview,
  insertReviewSql,
  getReviewInfo,
} from "./store.sql.js";

// 리뷰 작성
export const addReview = async (data) => {
  try {
    const conn = await pool.getConnection();

    // 가게 존재 여부 확인
    const [confirm1] = await pool.query(confirmStore, data.storeId);
    if (!confirm1[0].isExistStore) {
      conn.release();
      return -1; // 가게가 존재하지 않는 경우, -1 반환
    }

    // 리뷰 유무 여부 확인
    const [confirm2] = await pool.query(confirmReview, [
      data.memberId,
      data.storeId,
    ]);
    if (confirm2[0].isExistReview) {
      conn.release();
      return -2; // 이미 리뷰를 작성한 경우, -2 반환
    }

    console.log(data.memberId);
    console.log(data.storeId);
    console.log(data.score);
    console.log(data.body);
    // 리뷰 작성
    const result = await pool.query(insertReviewSql, [
      data.memberId,
      data.storeId,
      data.score,
      data.body,
    ]);

    conn.release();
    return result[0].insertId; // 리뷰 작성 성공 시 insertId 반환
  } catch (err) {
    throw new BaseError(status.BAD_REQUEST);
  }
};

// 리뷰 작성이 성공했을 때 반환
export const getReview = async (reviewId) => {
  try {
    const conn = await pool.getConnection();

    const [review] = await pool.query(getReviewInfo, reviewId);

    console.log(review);

    if (review.length == 0) {
      return -1;
    }

    conn.release();

    return review;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
