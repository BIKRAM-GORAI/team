import { apiRequest } from "./api.js";

const form = document.getElementById("reviewForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const serviceId = localStorage.getItem("currentServiceId");
    const providerId = localStorage.getItem("currentProviderId");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await apiRequest("/review", "POST", {
        serviceRequestId: serviceId,
        reviewerId: user._id,
        targetUserId: providerId,
        rating: document.getElementById("rating").value,
        comment: document.getElementById("comment").value
      });

      alert("Review submitted successfully");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}


// VIEW REVIEWS
const reviewsDiv = document.getElementById("reviews");

if (reviewsDiv) {
  loadReviews();
}

async function loadReviews() {
  try {
    const userId = localStorage.getItem("viewUserId");
    const reviews = await apiRequest(`/review/${userId}`);

    if (reviews.length === 0) {
      reviewsDiv.innerHTML = "<p>No reviews yet.</p>";
      return;
    }

    reviews.forEach((r) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${r.reviewerId.name}</strong></p>
        <p>Rating: ${r.rating} ⭐</p>
        <p>${r.comment || ""}</p>
        <hr/>
      `;
      reviewsDiv.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}
