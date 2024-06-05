import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {
  connectFoodCategory,
  confirmEmail,
  getUserID,
  insertUserSql,
  getPreferToUserID,
  confirmMember,
  confirmMemberMission,
  insertMemberMissionSql,
  getMemberMissionInfo,
} from "./user.sql.js";

// sign in -> insert query
export const addUser = async (data) => {
  try {
    const conn = await pool.getConnection();

    const [confirm] = await pool.query(confirmEmail, data.email);

    if (confirm[0].isExistEmail) {
      conn.release();
      return -1;
    }

    const result = await pool.query(insertUserSql, [
      data.name,
      data.email,
      data.gender,
      data.birth,
      data.addr,
      data.specAddr,
      data.phone,
    ]);

    conn.release();
    return result[0].insertId;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const getUser = async (userId) => {
  try {
    const conn = await pool.getConnection();
    const [user] = await pool.query(getUserID, userId);

    // console.log(user);

    if (user.length == 0) {
      return -1;
    }

    conn.release();
    return user;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const setPrefer = async (userId, foodCategoryId) => {
  try {
    const conn = await pool.getConnection();

    console.log(userId);
    console.log(foodCategoryId);
    await pool.query(connectFoodCategory, [foodCategoryId, userId]);

    conn.release();

    return;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const getUserPreferToUserID = async (userID) => {
  try {
    const conn = await pool.getConnection();
    const prefer = await pool.query(getPreferToUserID, userID);

    conn.release();

    return prefer;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 가게 미션을 멤버 미션에 추가
export const addMemberMission = async (data) => {
  try {
    const conn = await pool.getConnection();

    console.log(data.member_id);
    console.log(data.mission_id);

    // 존재하는 멤버인지
    const [confirm1] = await pool.query(confirmMember, data.member_id);
    if (!confirm1[0].isExistMember) {
      conn.release();
      return -1;
    }

    // 도전하려는 미션이 이미 도전 중인지(이미 있는 미션인지)
    const [confirm2] = await pool.query(confirmMemberMission, data.mission_id);
    if (confirm2[0].isExistMemberMission) {
      conn.release();
      return -2;
    }

    const result = await pool.query(insertMemberMissionSql, [
      data.mission_id,
      data.member_id,
    ]);

    conn.release();

    return result[0].insertId;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const getMemberMission = async (member_missionId) => {
  try {
    const conn = await pool.getConnection();
    const [membermission] = await pool.query(
      getMemberMissionInfo,
      member_missionId
    );

    if (membermission.length == 0) {
      return -1;
    }

    conn.release();
    return membermission;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
