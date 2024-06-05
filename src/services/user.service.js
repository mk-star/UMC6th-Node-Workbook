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

  if (joinUserData == -1) {
    // joinUserData가 -1일 때, if문에 걸려 Error를 뱉게 된다!
    throw new BaseError(status.EMAIL_ALREADY_EXIST);
  } else {
    console.log("오잉?" + joinUserData);
    for (let i = 0; i < prefer.length; i++) {
      console.log("prefer" + prefer[i]);
      console.log("prefer 길이" + prefer.length);
      await setPrefer(joinUserData, prefer[i]);
    }
    return signinResponseDTO(
      await getUser(joinUserData),
      await getUserPreferToUserID(joinUserData)
    );
  }
};
