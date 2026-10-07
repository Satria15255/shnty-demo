import API from "@/utils/axios";

// =======================
// 👟 PRODUCTS ADMIN
// =======================
export const createProduct = (data) => API.post("/api/products", data);
export const updateProduct = (id, formData) =>
	API.put(`/api/products/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);
