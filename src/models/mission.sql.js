export const insertMissionSql =
  "INSERT INTO mission (store_id, price, point, deadline) VALUES (?, ?, ?, ?);";

export const getMissionID = "SELECT * FROM mission WHERE id = ?";
