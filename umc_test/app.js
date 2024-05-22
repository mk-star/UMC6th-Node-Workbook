//let http = require("http");
// let url = require("url");
// let db_config = require(__dirname + "/config/database.js");
// let conn = db_config.init();
// //request, response
// let server = http.createServer((req, res) => {
//   conn.query(
//     "SELECT * FROM node_test WHERE id =" + "1",
//     function (error, results, fields) {
//       if (error) throw error;
//       console.log("id: " + results[0].id);
//     }
//   );
//   res.end("status: " + res.statusCode);
// });

// app.listen(port, () => {
//   console.log(`Connected! http://localhost:${port}`);
// });

const http = require("http");
const conn = require("./config/database.js");

function main(response) {
  console.log("main");
  conn.query(
    "SELECT * FROM member WHERE id =" + "1",
    function (err, results, fields) {
      if (err) throw err;
      console.log("id:", results[0].id);
      console.log("id:", results[0].name);
      console.log("id:", results[0].gender);
      console.log("id:", results[0].birth);
    }
  );
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Main Page");
  response.end();
}

const server = http.createServer((req, res) => {
  main(res);
});

// 서버를 시작합니다.
const port = 3000; // 포트 번호는 필요에 따라 수정하세요.
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
