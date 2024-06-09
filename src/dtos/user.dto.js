// sign in response DTO
export const signinResponseDTO = (user, prefer) => {
  const preferFood = [];

  for (let i = 0; i < prefer.length; i++) {
    preferFood.push(prefer[0][i].name);
  }

  return {
    email: user[0].email,
    name: user[0].user_name,
    preferCategory: preferFood,
  };
};

export const memberMissionResponseDTO = (membermission) => {
  return { membermission };
};

// 내가 작성한 리뷰 목록
export const previewReviewResponseDTO = (data) => {
  const reviews = [];

  for (let i = 0; i < data.length; i++) {
    reviews.push({
      member_name: data[i].name,
      rate: data[i].rate,
      body: data[i].body,
      create_date: formatDate(data[i].created_at),
    });
  }
  return { reviewData: reviews, cursorId: data[data.length - 1].review_id };
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("kr")
    .format(new Date(date))
    .replaceAll(" ", "")
    .slice(0, -1);
};
