import express from "express";

const app = express();
const port = 3000;

//애플리케이션 레벨
//use()는 모든 METHOD에서 동작
const myLogger = (req, res, next) => {
  console.log("LOGGED");

  //다음 미들웨어로 넘어감
  next();
};

//모든 요청에 대해 myLogger 실행
app.use(myLogger);

//라우터 레벨
//지정된 요청에서만 동작
app.get("/", (req, res) => {
  console.log("/");

  //클라이언트에게 응답으로 보내는 문자열
  res.send("Hello UMC!");
});

app.get("/hello", (req, res) => {
  console.log("/hello");
  res.send("Hello world!");
});

//서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
