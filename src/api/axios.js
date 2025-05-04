import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Include token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Log out user on 401 Unauthorized (unless the request was to /login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const reqUrl = error.config?.url || "";

    if (
      status === 401 &&
      // normalize URLs: if your login endpoint is exactly "/login", this works as-is.
      // adjust the string if your client actually requests e.g. "/auth/login"
      !reqUrl.includes("/login")
    ) {
      // Remove the old token
      localStorage.removeItem("token");
      // Redirect to your login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
