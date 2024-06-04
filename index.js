// index.js

import express from "express";
import { tempRouter } from "./src/routes/temp.route.js";
import { response } from "./config/response.js";

const app = express();
const port = 3000;

// main 함수에 router setting
// index.js에 모든 라우팅 함수를 등록하는 게 아니라
// 각 경로 별로 라우팅 함수를 정의한 다음 하나의 파일로 묶어 모듈화!!
app.use("/temp", tempRouter);

// error handling
//오류 처리 미들웨어는 other app.use()및 라우팅 호출 다음에 마지막으로 정의
app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  // res.locals -> 응답 객체에서 지역 변수들을 저장할 수 있는 객체
  // res.locals.message에 err.message를 저장
  // 템플릿 엔진 변수 설정

  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  // process.env.NODE_ENV !== production -> 개발환경이라는 뜻
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기

  res.status(err.data.status).send(response(err.data));
  // 응답의 상태코드를 err.data.status로 설정
  // response(err.data) -> 클라이언트에게 보낼 응답 데이터 생성
});
//err.data = status.BAD_REQUEST

//서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
