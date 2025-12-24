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
      div.innerHTML = `
        <h4>${s.title}</h4>
        <p>Status: ${s.status}</p>
        <button onclick="viewBids('${s._id}')">View Bids</button>
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
      div.innerHTML = `
        <p><strong>Provider:</strong> ${b.providerId.name}</p>
        <p><strong>Price:</strong> ₹${b.price}</p>
        <p><strong>ETA:</strong> ${b.estimatedTime}</p>
        <p>${b.message || ""}</p>
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
    await apiRequest("/service/assign", "PATCH", {
      serviceId,
      providerId
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
