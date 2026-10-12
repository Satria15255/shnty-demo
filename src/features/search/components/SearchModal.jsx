import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const SearchModal = ({ onClose }) => {
	const [query, setQuery] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/products") {
			const params = new URLSearchParams(location.search);

			setQuery(params.get("search") || "");
		} else {
			setQuery("");
		}
	}, [location.pathname, location.search]);

	const handleSearch = (e) => {
		e.preventDefault();

		const keyword = query.trim();

		if (!keyword) {
			navigate("/products");
			return;
		}

		navigate(`/products?search=${encodeURIComponent(keyword)}`);
	};

	return (
		<main className="w-full flex">
			<form onSubmit={handleSearch} className="w-full">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search Products..."
					className="w-full border border-[#0C0C0C] px-2 rounded-l-xl font-ysabeau py-2"
				/>
			</form>
			<button className="p-3 rounded-r-xl bg-[#0C0C0C] text-white">
				<IoIosSearch />
			</button>
		</main>
	);
};

export default SearchModal;
