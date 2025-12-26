import { apiRequest } from "./api.js";

// ---------- DASHBOARD: load services ----------
const servicesDiv = document.getElementById("myServices");
if (servicesDiv) {
  loadMyServices();
}

async function loadMyServices() {
  try {
    const services = await apiRequest("/service?mine=true");
    servicesDiv.innerHTML = "";

    if (services.length === 0) {
      servicesDiv.innerHTML = "<p>No services created yet.</p>";
      return;
    }

    services.forEach((s) => {
      const div = document.createElement("div");
      // ❌ hide completed + reviewed jobs
      if (s.status === "COMPLETED" && s.reviewGiven) {
        return;
      }

      let actionButton = "";

      if (s.status === "OPEN") {
        actionButton = `<button onclick="viewBids('${s._id}')">View Bids</button>`;
      }

      if (s.status === "IN_PROGRESS") {
        actionButton = `<button onclick="finishJob('${s._id}')">Finish Job</button>`;
      }

      if (s.status === "COMPLETED") {
        actionButton = `
    <button onclick="addReview('${s._id}', '${s.assignedProvider}')">
      Add Review
    </button>
  `;
      }

      div.innerHTML = `
  <h4>${s.title}</h4>
  <p>Status: ${s.status}</p>
  ${actionButton}
  <hr/>
`;

      servicesDiv.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}

window.viewBids = (serviceId) => {
  localStorage.setItem("currentServiceId", serviceId);
  window.location.href = "bids.html";
};

// ---------- BIDS PAGE ----------
const bidsDiv = document.getElementById("bids");
if (bidsDiv) {
  loadBids();
}

async function loadBids() {
  try {
    const serviceId = localStorage.getItem("currentServiceId");
    const bids = await apiRequest(`/bid/${serviceId}`);

    bidsDiv.innerHTML = "";

    if (bids.length === 0) {
      bidsDiv.innerHTML = "<p>No bids yet.</p>";
      return;
    }

    bids.forEach((b) => {
      const div = document.createElement("div");
      // div.innerHTML = `
      //   <p><strong>Provider:</strong> ${b.providerId.name}</p>
      //   <p><strong>Price:</strong> ₹${b.price}</p>
      //   <p><strong>ETA:</strong> ${b.estimatedTime}</p>
      //   <p>${b.message || ""}</p>
      //   <button onclick="acceptBid('${b.serviceRequestId}', '${
      //   b.providerId._id
      // }')">
      //     Accept Bid
      //   </button>
      //   <hr/>
      // `;
      div.innerHTML = `
  <p><strong>Provider:</strong> ${b.providerId.name}</p>
  <p>Price: ₹${b.price}</p>
  <p>ETA: ${b.estimatedTime}</p>
  <button onclick="viewProvider('${b.providerId._id}')">
    View Profile
  </button>
  <button onclick="acceptBid('${b.serviceRequestId}', '${b.providerId._id}')">
    Accept Bid
  </button>
  <hr/>
`;

      bidsDiv.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}

window.acceptBid = async (serviceId, providerId) => {
  try {
    localStorage.setItem("currentServiceId", serviceId);
    localStorage.setItem("currentProviderId", providerId);

    await apiRequest("/service/assign", "PATCH", {
      serviceId,
      providerId,
    });

    alert("Bid accepted. Service is now in progress.");
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};

window.goBack = () => {
  window.location.href = "dashboard.html";
};

window.viewProvider = (providerId) => {
  localStorage.setItem("viewUserId", providerId);
  window.location.href = "../shared/profile.html";
};

window.finishJob = async (serviceId) => {
  const confirmClose = confirm("Are you sure the job is completed?");
  if (!confirmClose) return;

  try {
    await apiRequest("/service/complete", "PATCH", {
      serviceId,
    });

    alert("Job marked as completed");
    window.location.reload();
  } catch (err) {
    alert(err.message);
  }
};

window.addReview = (serviceId, providerId) => {
  localStorage.setItem("currentServiceId", serviceId);
  localStorage.setItem("currentProviderId", providerId);

  window.location.href = "rate.html";
};
