import { apiRequest } from "./api.js";

const profileDiv = document.getElementById("profile");
const reviewsDiv = document.getElementById("reviews");

const userId = localStorage.getItem("viewUserId");

if (!userId) {
  alert("No user selected");
}

// Load profile
async function loadProfile() {
  try {
    const user = await apiRequest(`/user/${userId}`);

    profileDiv.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Role:</strong> ${user.role}</p>
    `;
  } catch (err) {
    alert(err.message);
  }
}

// Load reviews
async function loadReviews() {
  try {
    const reviews = await apiRequest(`/review/${userId}`);

    if (reviews.length === 0) {
      reviewsDiv.innerHTML = "<p>No reviews yet.</p>";
      return;
    }

    let total = 0;

    reviews.forEach((r) => {
      total += r.rating;

      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${r.reviewerId.name}</strong></p>
        <p>Rating: ${r.rating} ⭐</p>
        <p>${r.comment || ""}</p>
        <hr/>
      `;
      reviewsDiv.appendChild(div);
    });

    const avg = (total / reviews.length).toFixed(1);
    profileDiv.innerHTML += `<p><strong>Average Rating:</strong> ${avg} ⭐</p>`;
  } catch (err) {
    alert(err.message);
  }
}

window.goBack = () => {
  window.history.back();
};

loadProfile();
loadReviews();
