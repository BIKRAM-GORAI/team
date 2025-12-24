

import { apiRequest } from "./api.js";

// Navigation
window.goToNearbyJobs = () => {
  window.location.href = "nearby-jobs.html";
};

// Load nearby jobs
const jobsDiv = document.getElementById("jobs");
if (jobsDiv) {
  loadNearbyJobs();
}

async function loadNearbyJobs() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const lng = user.location.coordinates[0];
    const lat = user.location.coordinates[1];
    const radius = user.radius || 5;

    const jobs = await apiRequest(
      `/service?lng=${lng}&lat=${lat}&radius=${radius}`
    );

    jobsDiv.innerHTML = "";

    if (jobs.length === 0) {
      jobsDiv.innerHTML = "<p>No nearby jobs found.</p>";
      return;
    }

    jobs.forEach((job) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${job.title}</h4>
        <p>${job.description}</p>
        <p>Budget: ₹${job.budget}</p>
        <button onclick="placeBid('${job._id}')">Place Bid</button>
        <hr/>
      `;
      jobsDiv.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}

// Redirect to bid page
window.placeBid = (serviceId) => {
  localStorage.setItem("currentServiceId", serviceId);
  window.location.href = "place-bid.html";
};



// PLACE BID
const bidForm = document.getElementById("bidForm");
if (bidForm) {
  bidForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const serviceId = localStorage.getItem("currentServiceId");
    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      serviceRequestId: serviceId,
      providerId: user._id,
      price: document.getElementById("price").value,
      estimatedTime: document.getElementById("estimatedTime").value,
      message: document.getElementById("message").value
    };

    try {
      await apiRequest("/bid", "POST", data);
      alert("Bid submitted successfully!");
      window.location.href = "nearby-jobs.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// Back button
window.goBack = () => {
  window.location.href = "nearby-jobs.html";
};

