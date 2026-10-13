import API from "@/utils/axios";

// 👤 AUTH
// =======================
export const login = (data) => API.post("/api/auth/login", data);
export const register = (data) => API.post("/api/auth/register", data);
export const getUserProfile = () => API.get(`/api/auth/users/profile`);
export const updateProfile = (data) =>
	API.patch("/api/auth/users/profile", data);
export const changePassword = (data) =>
	API.put("/api/auth/users/change-password", data);

// ADDRESS ENDPOINT
export const addUserAddress = (data) =>
	API.post("/api/auth/users/address", data);
export const updateUserAddress = (id, data) =>
	API.patch(`/api/auth/users/address/${id}`, data);
export const setDefaultAddress = (id) =>
	API.patch(`/api/auth/users/address/${id}/default`);
export const deleteUserAddress = (id) =>
	API.delete(`/api/auth/users/address/${id}`);
