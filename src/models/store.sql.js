export const insertReviewSql =
  "INSERT INTO review (member_id, store_id, score, body) VALUES (?, ?, ?, ?);";

export const confirmStore =
  "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;";

export const confirmReview =
  "SELECT EXISTS(SELECT 1 FROM review WHERE member_id = ? AND store_id = ?) as isExistReview;";

export const getReviewInfo = "SELECT * FROM review WHERE id = ?;";
