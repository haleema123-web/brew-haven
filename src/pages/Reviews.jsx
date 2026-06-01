import { useState, useEffect } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reviews/")
      .then((res) => res.json())
      .then((data) => {
        console.log("REVIEWS:", data);
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("REVIEW ERROR:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h1 className="page-title">Customer Reviews ⭐</h1>

        <p className="subtitle">
          What our happy customers say about us
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading Reviews...</p>
      ) : (
        <div className="reviews-grid">
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map((item) => (
              <div className="review-box" key={item.id}>
                <div className="stars">
                  {"⭐".repeat(item.rating || 5)}
                </div>

                <p className="review-text">
                  “{item.comment}”
                </p>

                <h3 className="review-name">
                  - {item.name}
                </h3>

                <div className="quote">❝</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Reviews;