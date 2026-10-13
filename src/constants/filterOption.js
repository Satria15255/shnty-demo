export const FILTER_GROUPS = [
	{
		key: "category",

		label: "Collection",
		options: ["Man", "Woman", "Unisex", "Accessories"],
	},
	{
		key: "type",
		label: "Category",
		options: [
			"T-Shirt",
			"Hoodie",
			" Shirt",
			"Jacket",
			" Outerwear",
			"Pants",
			"Shorts",
			"Sweater",
			"Accessories",
		],
	},
	{
		key: "size",
		label: "Size",
		options: ["S", "M", "L", "XL", "XXL", "One Size"],
	},
];

export const emptyFilters = () => ({
	category: [],
	type: [],
	size: [],
	discounts: false,
	latest: false,
});

export const readFilters = (params) => ({
	category: params.getAll("category"),
	type: params.getAll("type"),
	size: params.getAll("size"),
	discount: params.get("discount") === "true",
	latest: params.get("latest") === "true",
});

export const createFilterParams = (currentParams, filters) => {
	const params = new URLSearchParams(currentParams);

	// Hapus filter lama, pertahankan parameter search
	["category", "type", "size", "discount", "latest", "page"].forEach((key) =>
		params.delete(key),
	);

	filters.category.forEach((value) => {
		params.append("category", value);
	});

	filters.type.forEach((value) => {
		params.append("type", value);
	});

	filters.size.forEach((value) => {
		params.append("size", value);
	});

	if (filters.discount) {
		params.set("discount", "true");
	}

	if (filters.latest) {
		params.set("latest", "true");
	}

	return params;
};
