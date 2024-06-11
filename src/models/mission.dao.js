import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { confirmMemberMission, updateMissionStatus } from "./mission.sql.js";

export const modifyMissionStatus = async (data) => {
  try {
    const conn = await pool.getConnection();

    const [confirm] = await pool.query(confirmMemberMission, data.mission_id);

    if (!confirm[0].isExistMemberMission) {
      conn.release();
      return -1;
    }

    const [result] = await pool.query(updateMissionStatus, [
      data.mission_id,
      data.member_id,
    ]);
    conn.release();
    if (result.affectedRows > 0) {
      return {
        status: "success",
        message: "미션을 성공적으로 완료했습니다.",
      };
    } else {
      return { status: "error", message: "No rows were updated" };
    }
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
