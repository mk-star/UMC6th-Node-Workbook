// 회원가입
export const insertUserSql =
  "INSERT INTO member (name, email, gender, birth, address, spec_address, phone) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM member WHERE id = ?;";

export const connectFoodCategory =
  "INSERT INTO like_category (category_id, member_id) VALUES (?, ?);";

export const confirmEmail =
  "SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;";

export const getPreferToUserID =
  "SELECT lc.id, lc.category_id, lc.member_id, fc.name FROM like_category lc JOIN food_category fc on lc.category_id = fc.id WHERE lc.member_id = ? ORDER BY lc.category_id ASC;";

// 가게 미션을 도전 중인 미션에 추가
export const confirmMember =
  "SELECT EXISTS(SELECT 1 FROM member WHERE id = ?) as isExistMember;";

export const confirmMemberMission =
  "SELECT EXISTS(SELECT 1 FROM member_mission WHERE mission_id = ?) as isExistMemberMission;";

export const getMemberMissionInfo = "SELECT * FROM member_mission WHERE id = ?";

export const insertMemberMissionSql =
  "INSERT INTO member_mission (mission_id, member_id) VALUES (?, ?);";

// 내가 작성한 리뷰 목록
export const getReviewByReviewId =
  "SELECT m.name, m.id as member_id, r.id as review_id, r.rate, r.body, r.created_at " +
  "FROM review r JOIN member m ON r.member_id = m.id " +
  "WHERE m.id = ? AND r.id < ? " +
  "ORDER BY r.id DESC LIMIT ? ;";

export const getReviewByReviewIdAtFirst =
  "SELECT m.name, m.id as member_id, r.id as review_id, r.rate, r.body, r.created_at " +
  "FROM review r JOIN member m ON r.member_id = m.id " +
  "WHERE m.id = ? " +
  "ORDER BY r.id DESC LIMIT ? ;";

// 사용자가 진행 중인 미션 목록 조회(페이징)
export const getMissionByMissionId =
  "SELECT s.name, m.id as mission_id, m.price, m.point " +
  "FROM mission m " +
  "JOIN member_mission mm on mm.mission_id = m.id " +
  "JOIN store s on m.store_id = s.id " +
  "WHERE mm.member_id = ? AND mm.status='진행중' " +
  "AND mm.id < ? " +
  "ORDER BY mm.id DESC LIMIT ? ;";

export const getMissionByMissionIdAtFirst =
  "SELECT s.name, m.id as mission_id, m.price, m.point " +
  "FROM mission m " +
  "JOIN member_mission mm on mm.mission_id = m.id " +
  "JOIN store s on m.store_id = s.id " +
  "WHERE mm.member_id = ? AND mm.status='진행중' " +
  "ORDER BY mm.id DESC LIMIT ? ;";
