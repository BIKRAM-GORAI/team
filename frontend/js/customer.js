import { apiRequest } from "./api.js";

// Redirect
window.goToCreate = () => {
  window.location.href = "create-request.html";
};

// CREATE SERVICE
const form = document.getElementById("createServiceForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      title: document.getElementById("title").value,
      serviceType: document.getElementById("serviceType").value,
      description: document.getElementById("description").value,
      budget: document.getElementById("budget").value,
      customerId: user._id,
      location: user.location
    };

    try {
      await apiRequest("/service", "POST", data);
      alert("Service posted successfully");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// LOAD MY SERVICES
const servicesDiv = document.getElementById("myServices");
if (servicesDiv) {
  loadMyServices();
}

async function loadMyServices() {
  try {
    const services = await apiRequest("/service?mine=true");
    servicesDiv.innerHTML = "";

    services.forEach((s) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${s.title}</strong> - ${s.status}</p>
      `;
      servicesDiv.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}
