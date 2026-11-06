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
		<main className="w-full flex border px-3 rounded-2xl">
			<form onSubmit={handleSearch} className="w-full">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search.."
					className="w-full px-2  py-2"
				/>
			</form>
			<button className="  text-2xl ">
				<IoIosSearch />
			</button>
		</main>
	);
};

export default SearchModal;
