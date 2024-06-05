export const insertUserSql =
  "INSERT INTO member (name, email, gender, birth, address, spec_address, phone) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM member WHERE id = ?";

export const connectFoodCategory =
  "INSERT INTO like_category (category_id, member_id) VALUES (?, ?)";

export const confirmEmail =
  "SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;";

export const getPreferToUserID =
  "SELECT lc.id, lc.category_id, lc.member_id, fc.name FROM like_category lc JOIN food_category fc on lc.category_id = fc.id WHERE lc.member_id = ? ORDER BY lc.category_id ASC;";
