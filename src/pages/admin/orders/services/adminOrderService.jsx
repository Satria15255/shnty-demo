import API from "@/utils/axios";

export const getAllTransactions = () => API.get("/api/transactions");
export const updateTransactionStatus = (orderId, newStatus) =>
	API.put(`/api/transactions/${orderId}/status`, { status: newStatus });
