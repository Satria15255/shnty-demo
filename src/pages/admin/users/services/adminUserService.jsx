import API from "@/utils/axios";

// =======================
// 👤 CUSTOMER LIST
// =======================
export const getAllUsers = () => API.get("/api/admin/user-list");
export const getUserTransactions = (userId) =>
	API.get(`/api/admin/user/${userId}/transactions`);
export const getCustStats = () => API.get("/api/admin/user/customer-stats");
export const getCustDetail = (userId) =>
	API.get(`/api/admin/user-details/${userId}`);
