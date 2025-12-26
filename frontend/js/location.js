import { apiRequest } from "./api.js";

let map;
let marker;
let selectedLatLng = null;

// Initialize map
map = L.map("map").setView([20.5937, 78.9629], 5); // India default

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

// Click to place marker
map.on("click", function (e) {
  selectedLatLng = e.latlng;

  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
});

// Save location
document.getElementById("saveLocation").addEventListener("click", async () => {
  if (!selectedLatLng) {
    alert("Please select a location on the map");
    return;
  }

  const radius = document.getElementById("radius").value;
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await apiRequest("/user/location", "PUT", {
      userId: user._id,
      location: {
        type: "Point",
        coordinates: [selectedLatLng.lng, selectedLatLng.lat],
      },
      radius,
    });
    // 🔄 Update localStorage user object
    user.location = {
      type: "Point",
      coordinates: [selectedLatLng.lng, selectedLatLng.lat],
    };
    user.radius = radius;

    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "customer") {
      window.location.href = "customer/dashboard.html";
    } else {
      window.location.href = "provider/dashboard.html";
    }
  } catch (err) {
    alert(err.message);
  }
});

// Auto-detect current location
document.getElementById("detectLocation").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      selectedLatLng = { lat, lng };

      map.setView([lat, lng], 15);

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([lat, lng]).addTo(map);
    },
    () => {
      alert("Unable to fetch your location");
    }
  );
});
