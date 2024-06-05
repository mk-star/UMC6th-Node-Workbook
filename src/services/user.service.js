import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { signinResponseDTO } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferToUserID,
  setPrefer,
} from "../models/user.dao.js";

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

  // email이 중복되면 안되니 email이 이미 존재할 경우 -1을 반환하여 에러 처리
  if (joinUserData == -1) {
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
