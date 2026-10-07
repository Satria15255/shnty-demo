import API from "@/utils/axios";

// =======================
// 👤 CUSTOMER LIST
// =======================
export const getAllUsers = () => API.get("/api/admin/user-list");
export const getUserTransactions = (userId) =>
	API.get(`/api/admin/users/${userId}/transactions`);
export const getCustStats = () => API.get("/api/admin/user/customer-stats");
