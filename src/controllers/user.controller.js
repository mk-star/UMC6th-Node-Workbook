import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { joinUser, joinMemberMission } from "../services/user.service.js";

import { getReview } from "../providers/user.provieder.js";

export const userSignin = async (req, res, next) => {
  console.log("회원가입을 요청하였습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트 용

  res.send(response(status.SUCCESS, await joinUser(req.body)));
};

export const memberMission = async (req, res, next) => {
  console.log("도전 중인 미션에 추가를 요청하였습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트 용

  res.send(
    response(
      status.SUCCESS,
      await joinMemberMission(req.params.missionId, req.body)
    )
  );
};

export const reviewPreview = async (req, res, next) => {
  console.log("내가 작성한 리뷰 목록을 요청하였습니다!");
  console.log("query:", req.query);

  res.send(
    response(status.SUCCESS, await getReview(req.params.memberId, req.query))
  );
};
