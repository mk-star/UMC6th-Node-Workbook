let mysql = require("mysql");
let dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "umc_node",
};

const conn = mysql.createConnection(dbConfig);
module.exports = conn;

// module.exports = {
//   init: function () {
//     return mysql.createConnection(db_info);
//   },
//   connect: function (conn) {
//     conn.connect(function (err) {
//       if (err) console.error("mysql connection error : " + err);
//       else console.log("mysql is connected successfully!");
//     });
//   },
// };
