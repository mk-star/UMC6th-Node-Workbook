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

// 특정 가게의 리뷰 목록 조회(페이징)
export const getReviewByReviewId =
  "SELECT m.name, m.id as member_id, r.id as review_id, r.rate, r.body, r.created_at " +
  "FROM review r JOIN member m on r.member_id = m.id " +
  "WHERE r.store_id = ? AND r.id < ? " +
  "ORDER BY r.id DESC LIMIT ? ;";

export const getReviewByReviewIdAtFirst =
  "SELECT m.name, m.id as member_id, r.id as review_id, r.rate, r.body, r.created_at " +
  "FROM review r JOIN member m on r.member_id = m.id " +
  "WHERE r.store_id = ? " +
  "ORDER BY r.id DESC LIMIT ? ;";

// 특정 가게의 미션 목록 조회(페이징)
export const getMissionByMissionId =
  "SELECT s.name, s.type, m.id as mission_id, s.id as store_id, m.point, m.deadline, m.price " +
  "FROM mission m JOIN store s on m.store_id = s.id " +
  "WHERE m.store_id = ? AND m.id < ? " +
  "ORDER BY m.id DESC LIMIT ? ;";

export const getMissionByMissionIdAtFirst =
  "SELECT s.name, s.type, m.id as mission_id, s.id as store_id, m.point, m.deadline, m.price " +
  "FROM mission m JOIN store s on m.store_id = s.id " +
  "WHERE m.store_id = ? " +
  "ORDER BY m.id DESC LIMIT ? ;";
