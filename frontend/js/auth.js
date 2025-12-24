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
          coordinates: [0, 0]
        },
        radius: 5
      });

      alert("Registered successfully. Please login.");
      window.location.href = "login.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

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
        password
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      if (res.user.role === "customer") {
        window.location.href = "location.html";
      } else {
        window.location.href = "location.html";
      }
    } catch (err) {
      alert(err.message);
    }
  });
}
