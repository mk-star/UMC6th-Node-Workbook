// 특정 지역에 가게 추가
export const confirmRegion =
  "SELECT EXISTS(SELECT 1 FROM region WHERE id = ?) as isExistRegion;";
export const insertStoreSql =
  "INSERT INTO store (region_id, name, type, rating, status, address) VALUES (?, ?, ?, ?, ?, ?);";

export const getStoreInfo = "SELECT * FROM store WHERE id = ?";

// 가게 리뷰
export const insertReviewSql =
  "INSERT INTO review (member_id, store_id, score, body) VALUES (?, ?, ?, ?);";

export const confirmStore =
  "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;";

export const confirmReview =
  "SELECT EXISTS(SELECT 1 FROM review WHERE member_id = ? AND store_id = ?) as isExistReview;";

export const getReviewInfo = "SELECT * FROM review WHERE id = ?;";

// 가게 미션
export const insertMissionSql =
  "INSERT INTO mission (store_id, price, point, deadline) VALUES (?, ?, ?, ?);";

export const getMissionInfo = "SELECT * FROM mission WHERE id = ?";
