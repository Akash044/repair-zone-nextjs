import requestServices from "./httpServices";

class ReviewServices {
  getReviews() {
    return requestServices.get("/reviews");
  }
  postReview(body: object) {
    return requestServices.post("/reviews", body);
  }
  updateReview(body: object) {
    return requestServices.update("/reviews", body);
  }
  deleteReview(id: string) {
    return requestServices.delete(`/reviews/${id}`);
  }
}

export default new ReviewServices();
