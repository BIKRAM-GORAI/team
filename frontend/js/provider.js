import { apiRequest } from "./api.js";

// Navigation
window.goToNearbyJobs = () => {
  window.location.href = "nearby-jobs.html"; //allows calling gotoNearbyJobs function from html file
};

// Load nearby jobs
const jobsDiv = document.getElementById("jobs"); //selects the div with id jobs to display nearby jobs
if (jobsDiv) {
  loadNearbyJobs(); //prevents loading nearby jobs if jobsDiv is not present
}

async function loadNearbyJobs() {
  //declaration of loadNearbyJobs function
  try {
    const user = JSON.parse(localStorage.getItem("user")); //retrieves user data from local storage//converts stringified user data back to object

    const lng = user.location.coordinates[0]; //gets the data from the object
    const lat = user.location.coordinates[1];
    const radius = user.radius || 5;

    const jobs = await apiRequest(
      `/service?lng=${lng}&lat=${lat}&radius=${radius}`
    ); //sends a get request to backend to fetch nearby jobs and passes radius and co ordinated as query parameterrs

    jobsDiv.innerHTML = ""; //removes old content from jobsDiv

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
      message: document.getElementById("message").value,
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

// Load active job (if any)
const activeJobDiv = document.getElementById("activeJob");
if (activeJobDiv) {
  loadActiveJob();
}

// async function loadActiveJob() {
//   try {
//     const job = await apiRequest("/service/active");

//     if (!job) {
//       activeJobDiv.innerHTML = "<p>No active job.</p>";
//       return;
//     }

//     // activeJobDiv.innerHTML = `
//     //   <h4>${job.title}</h4>
//     //   <p>Customer: ${job.customerId.name}</p>
//     //   <button onclick="viewCustomerLocation(
//     //     ${job.customerId.location.coordinates[1]},
//     //     ${job.customerId.location.coordinates[0]}
//     //   )">
//     //     View Customer Location
//     //   </button>
//     // `;
//     activeJobDiv.innerHTML = `
//   <h4>${job.title}</h4>
//   <p>Customer: ${job.customerId.name}</p>
//   <button onclick="viewCustomerLocation(
//     ${job.assignedProvider.location.coordinates[1]},
//     ${job.assignedProvider.location.coordinates[0]},
//     ${job.customerId.location.coordinates[1]},
//     ${job.customerId.location.coordinates[0]}
//   )">
//     View Customer Location
//   </button>
// `;
//   } catch (err) {
//     activeJobDiv.innerHTML = "<p>No active job.</p>";
//   }
// }

async function loadActiveJob() {
  try {
    const job = await apiRequest("/service/active");

    if (!job) {
      activeJobDiv.innerHTML = "<p>No active job.</p>";
      return;
    }

    // 🔥 provider = logged in user
    const provider = JSON.parse(localStorage.getItem("user"));

    const providerLat = provider.location.coordinates[1];
    const providerLng = provider.location.coordinates[0];

    const customerLat = job.customerId.location.coordinates[1];
    const customerLng = job.customerId.location.coordinates[0];

    activeJobDiv.innerHTML = `
      <h4>${job.title}</h4>
      <p>Customer: ${job.customerId.name}</p>
      <button onclick="openRoute(
        ${providerLat},
        ${providerLng},
        ${customerLat},
        ${customerLng}
      )">
        View Customer Location
      </button>
    `;
  } catch (err) {
    activeJobDiv.innerHTML = "<p>No active job.</p>";
  }
}


// window.viewCustomerLocation = (
//   providerLat,
//   providerLng,
//   customerLat,
//   customerLng
// ) => {
//   const mapUrl = `https://www.google.com/maps/dir/${providerLat},${providerLng}/${customerLat},${customerLng}`;
//   window.open(mapUrl, "_blank");
// };

window.openRoute = (
  providerLat,
  providerLng,
  customerLat,
  customerLng
) => {
  console.log("PROVIDER:", providerLat, providerLng);
  console.log("CUSTOMER:", customerLat, customerLng);

  const url = `https://www.google.com/maps/dir/${providerLat},${providerLng}/${customerLat},${customerLng}`;
  window.open(url, "_blank");
};
