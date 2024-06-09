import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import {
  joinReview,
  joinMission,
  joinStoreRegion,
} from "../services/store.service.js";

import { getReview } from "../providers/store.provider.js";

// 특정 지역에 가게 추가
export const storeRegion = async (req, res, next) => {
  console.log("가게 추가를 요청하였습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

  res.send(
    response(
      status.SUCCESS,
      await joinStoreRegion(req.params.regionId, req.body)
    )
  );
};

// 리뷰 작성
export const storeReview = async (req, res, next) => {
  console.log("리뷰 작성을 요청하였습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

  res.send(
    response(status.SUCCESS, await joinReview(req.params.storeId, req.body))
  );
};

// 미션 작성
export const storeMission = async (req, res, next) => {
  console.log("미션 작성을 요청하였습니다!");
  console.log("body:", req.body);

  res.send(
    response(status.SUCCESS, await joinMission(req.params.storeId, req.body))
  );
};

// 목록 조회(페이징)
export const reviewPreview = async (req, res, next) => {
  console.log("목록 조회를 요청하였습니다!");
  console.log("body:", req.query);

  return res.send(
    response(status.SUCCESS, await getReview(req.params.storeId, req.query))
  );
};
