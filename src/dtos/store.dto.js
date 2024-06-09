// 지역 가게 response DTO
export const addStoreRegionResponseDTO = (store) => {
  return { store };
};

// 리뷰 response DTO
export const addReviewResponseDTO = (review) => {
  return { review };
};

// 미션 response DTO
export const addMissionResponseDTO = (mission) => {
  return { mission };
};

// 미션 목록 조회(페이징)
export const previewReviewResponseDTO = (data) => {
  const reviews = [];

  for (let i = 0; i < data.length; i++) {
    reviews.push({
      member_name: data[i].name,
      rate: data[i].rate,
      review_body: data[i].body,
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
