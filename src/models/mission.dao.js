import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertMissionSql, getMissionID } from "./mission.sql.js";

// Mission 데이터 삽입
export const addMission = async (data) => {
  try {
    const conn = await pool.getConnection();

    const result = await pool.query(insertMissionSql, [
      data.store_id,
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

// 미션 정보 얻기
export const getMission = async (missionId) => {
  try {
    const conn = await pool.getConnection();

    const [mission] = await pool.query(getMissionID, missionId);

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
