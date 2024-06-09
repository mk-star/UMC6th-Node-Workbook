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

// 특정 가게의 리뷰 목록 조회(페이징)
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

// 특정 가게의 리뷰 목록 조회(페이징)

export const previewMissionResponseDTO = (data) => {
  const missions = [];

  console.log("엥" + data.length);
  for (let i = 0; i < data.length; i++) {
    missions.push({
      store_name: data[i].name,
      store_type: data[i].type,
      point: data[i].point,
      deadline: data[i].deadline,
      price: data[i].price,
    });
  }
  return { missionData: missions, cursorId: data[data.length - 1].mission_id };
};
