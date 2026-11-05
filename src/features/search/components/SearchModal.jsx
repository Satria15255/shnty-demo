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
		<main className="w-full flex text-white">
			<form onSubmit={handleSearch} className="w-full">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder=""
					className="w-full  px-2 rounded-l-xl text-white font-ysabeau py-2"
				/>
			</form>
			<button className="rounded-r-xl text-2xl text-white">
				<IoIosSearch />
			</button>
		</main>
	);
};

export default SearchModal;
