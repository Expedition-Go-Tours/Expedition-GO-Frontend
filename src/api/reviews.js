import { apiRequest, unwrap } from './client';

export async function createReview(formData) {
  const data = await apiRequest('/reviews', {
    method: 'POST',
    body: formData,
    auth: true,
    headers: {},
  });
  return unwrap(data);
}

export async function fetchTourReviews(tourId, params = {}) {
  const data = await apiRequest(`/reviews/tours/${tourId}`, {
    params,
    auth: false,
  });
  return unwrap(data);
}
