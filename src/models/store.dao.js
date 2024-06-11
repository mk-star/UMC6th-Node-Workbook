import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {
  confirmStore,
  confirmReview,
  confirmRegion,
  getReviewInfo,
  insertReviewSql,
  getMissionInfo,
  insertMissionSql,
  getStoreInfo,
  insertStoreSql,
  getReviewByReviewIdAtFirst,
  getReviewByReviewId,
  getMissionByMissionIdAtFirst,
  getMissionByMissionId,
} from "./store.sql.js";

// 특정 지역에 가게 추가 성공 시 반환
export const getStoreRegion = async (storeId) => {
  try {
    const conn = await pool.getConnection();

    const [store] = await pool.query(getStoreInfo, storeId);

    console.log(store);

    if (store.length == 0) {
      return -1;
    }

    conn.release();

    return store;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 특정 지역에 가게 추가
export const addStoreRegion = async (data) => {
  try {
    const conn = await pool.getConnection();

    // 지역 존재 여부 확인
    const [confirm1] = await pool.query(confirmRegion, data.regionId);
    if (!confirm1[0].isExistRegion) {
      conn.release();
      return -1; // 지역 존재하지 않는 경우, -1 반환
    }

    // 가게 추가
    const result = await pool.query(insertStoreSql, [
      data.regionId,
      data.name,
      data.type,
      data.rating,
      data.status,
      data.address,
    ]);

    conn.release();
    return result[0].insertId; // 리뷰 작성 성공 시 insertId 반환
  } catch (err) {
    throw new BaseError(status.BAD_REQUEST);
  }
};

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

// 미션 작성
export const addMission = async (data) => {
  try {
    const conn = await pool.getConnection();

    const result = await pool.query(insertMissionSql, [
      data.storeId,
      data.price,
      data.point,
      data.deadline,
    ]);

    conn.release();

    return result[0].insertId;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 미션 작성이 성공했을 때 반환
export const getMission = async (missionId) => {
  try {
    const conn = await pool.getConnection();

    const [mission] = await pool.query(getMissionInfo, missionId);

    console.log(mission);

    if (mission.length == 0) {
      return -1;
    }

    conn.release();

    return mission;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 특정 가게의 리뷰 목록 조회(페이징)
export const getPreviewReview = async (cursorId, size, storeId) => {
  try {
    const conn = await pool.getConnection();

    if (
      cursorId == "undefined" ||
      typeof cursorId == "undefined" ||
      cursorId == null
    ) {
      const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [
        parseInt(storeId),
        parseInt(size),
      ]);
      conn.release();
      return reviews;
    } else {
      const [reviews] = await pool.query(getReviewByReviewId, [
        parseInt(storeId),
        parseInt(cursorId),
        parseInt(size),
      ]);
      conn.release();
      return reviews;
    }
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 특정 가게의 미션 목록 조회(페이징)
export const getPreviewMission = async (cursorId, size, storeId) => {
  try {
    const conn = await pool.getConnection();

    if (
      cursorId == "undefined" ||
      typeof cursorId == "undefined" ||
      cursorId == null
    ) {
      const [missions] = await pool.query(getMissionByMissionIdAtFirst, [
        parseInt(storeId),
        parseInt(size),
      ]);
      conn.release();
      return missions;
    } else {
      const [missions] = await pool.query(getMissionByMissionId, [
        parseInt(storeId),
        parseInt(cursorId),
        parseInt(size),
      ]);
      conn.release();
      return missions;
    }
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
