// temp.response.dto.js

export const tempResponseDTO = (data) => {
  return { testString: data };
};

//json 데이터가 reponse(응답 데이터)의 result 부분에 들어감!

export const flagResponseDTO = (flag) => {
  return { flag: flag };
};
