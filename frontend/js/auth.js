import { apiRequest } from "./api.js";

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      await apiRequest("/auth/register", "POST", {
        name,
        email,
        password,
        role,
        location: {
          type: "Point",
          coordinates: [0, 0],
        },
        radius: 5,
      });

      alert("Registered successfully. Please login.");
      window.location.href = "login.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// LOGIN
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const res = await apiRequest("/auth/login", "POST", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user", JSON.stringify(res.user));

//       const hasLocation =
//         res.user.location &&
//         res.user.location.coordinates &&
//         res.user.location.coordinates.length === 2;

//       // 🔀 Redirect logic
//       if (!hasLocation) {
//         // First time login → set location
//         window.location.href = "location.html";
//       } else {
//         // Location already saved → go directly to dashboard
//         if (res.user.role === "customer") {
//           window.location.href = "customer/dashboard.html";
//         } else {
//           window.location.href = "provider/dashboard.html";
//         }
//       }
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await apiRequest("/auth/login", "POST", {
        email,
        password,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      const coords = res.user.location?.coordinates;

      const hasLocation =
        coords && coords.length === 2 && !(coords[0] === 0 && coords[1] === 0);

      if (!hasLocation) {
        window.location.href = "location.html";
      } else {
        if (res.user.role === "customer") {
          window.location.href = "customer/dashboard.html";
        } else {
          window.location.href = "provider/dashboard.html";
        }
      }
    } catch (err) {
      alert(err.message);
    }
  });
}
