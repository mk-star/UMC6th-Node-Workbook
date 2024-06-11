export const confirmMemberMission =
  "SELECT EXISTS(SELECT 1 FROM member_mission WHERE mission_id = ?) as isExistMemberMission;";

export const updateMissionStatus =
  "UPDATE member_mission " +
  "SET status = '진행완료' " +
  "WHERE mission_id = ? AND member_id = ?;";
