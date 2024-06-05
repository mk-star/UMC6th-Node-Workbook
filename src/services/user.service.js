import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

import {
  signinResponseDTO,
  memberMissionResponseDTO,
} from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferToUserID,
  setPrefer,
  addMemberMission,
  getMemberMission,
} from "../models/user.dao.js";

// 회원가입
export const joinUser = async (body) => {
  const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
  const prefer = body.prefer;

  const joinUserData = await addUser({
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: birth,
    addr: body.addr,
    specAddr: body.specAddr,
    phone: body.phone,
  });

  if (joinUserData == -1) {
    // joinUserData가 -1일 때, if문에 걸려 Error를 뱉게 된다!
    throw new BaseError(status.EMAIL_ALREADY_EXIST);
  } else {
    for (let i = 0; i < prefer.length; i++) {
      await setPrefer(joinUserData, prefer[i]);
    }
    return signinResponseDTO(
      await getUser(joinUserData),
      await getUserPreferToUserID(joinUserData)
    );
  }
};

// 가게 미션을 멤버 미션에 추가
export const joinMemberMission = async (missionId, body) => {
  const joinMemberMissionData = await addMemberMission({
    mission_id: missionId,
    member_id: body.member_id,
  });

  // 존재하지 않은 멤버
  if (joinMemberMissionData == -1) {
    throw new BaseError(status.MEMBER_NOT_FOUND);
    // 이미 도전 중인 미션
  } else if (joinMemberMissionData == -2) {
    throw new BaseError(status.MEMBERMISSION_ALREADY_EXIST);
  } else {
    //성공 시 응답 데이터
    return memberMissionResponseDTO(
      await getMemberMission(joinMemberMissionData)
    );
  }
};
