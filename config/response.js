// response.js
//API 응답을 통일시켜 일관성 부여!!
//응답 형식 통일
export const response = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess, //성공 여부
    code: code, //상태 코드 외 더 세부적인 결과
    message: message, //code 외에 추가적으로 어떤 결과인지 알려주기 위해 사용
    result: result, //응답으로 필요한 또 다른 데이터(json) 전달
  };
};
