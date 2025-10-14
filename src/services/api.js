import axios from "axios";

// Use correct port — must match your backend
const API_BASE_URL = "https://task-management-backend-qmfb.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginAPI = (data) => api.post("/api/auth/login", data);
export const signupAPI = (data) => api.post("/api/auth/signup", data);

// services/api.js
export const getTasks = async (token) => {
  const res = await api.get("/api/tasks", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const addTaskAPI = async (task, token) => {
  const res = await api.post("/api/tasks", task, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const updateTaskAPI = async (task, token) => {
  const res = await api.put(`/api/tasks/${task.id}`, task, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const deleteTaskAPI = async (id, token) => {
  const res = await api.delete(`/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
