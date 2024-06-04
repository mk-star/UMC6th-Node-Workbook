// temp.controller.js

import { status } from "../../config/response.status.js";
import { getTempData } from "../services/temp.service.js";
import { response } from "../../config/response.js";
import { CheckFlag } from "../services/temp.service.js";

export const tempTest = (req, res, next) => {
  res.send(response(status.SUCCESS, getTempData()));
};
//응답으로 status 중 SUCCESS에 해당되는 응답 내용이
//응답 포맷(response.js에서 작성한 response)에 넣어져 전송되게 된다.
//getTempData(): response에서 result 부분. 추가적으로 전달해야 할 데이터(json)
//result 값은 Service 단의 비즈니스 로직(service/provider 파일)을 거쳐 나온 데이터를
//DTO를 통해 클라이언트에게 전달하고자 하는 형태와 내용으로 만들게 됨

export const tempException = (req, res, next) => {
  console.log("/temp/exception/" + req.params.flag);
  //req.params.필드로 가져옴
  return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
};
