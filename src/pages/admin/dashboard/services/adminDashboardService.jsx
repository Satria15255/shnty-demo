import API from "@/utils/axios";

// =======================
// 👤 DASHBOARD STATISTIC
// =======================
export const getSalesData = (range) =>
	API.get(`/api/sales-chart?range=${range}`);
export const getDashboardSummary = (range) =>
	API.get(`/api/dashboard-stats/summary?range=${range}`);
export const getProductsSummary = (range) =>
	API.get(`/api/dashboard-stats/products?range=${range}`);
export const getOrdersSummary = (range) =>
	API.get(`/api/dashboard-stats/orders?range=${range}`);
export const getUsersSummary = (range) =>
	API.get(`/api/dashboard-stats/users?range=${range}`);
