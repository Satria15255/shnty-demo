import {
	getProductById,
	getAllProducts,
} from "@/features/products/services/productService";
import { useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import ProductCard from "@/features/products/components/ProductCard";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const RandomProduct = () => {
	const [products, setProducts] = useState([]);
	const [recommended, setRecommended] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const fetchProducts = async () => {
		try {
			setLoading(true);

			const { data: products } = await getAllProducts();
			const shuffled = products.sort(() => 0.5 - Math.random());
			setRecommended(shuffled.slice(0, 4));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	console.log(products);

	console.log(recommended);
	return (
		<main className="mt-8 w-full xl:max-w-7xl border-t pt-5 border-gray-300">
			<p className="text-lg lg:text-2xl font-semibold pb-4">
				Might You Like:
			</p>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:mt-2 lg:mt-4 w-full p-2 ">
				<LazyMotion features={domAnimation}>
					{recommended.map((product) => (
						<ProductCard
							key={product._id}
							productDetails={() =>
								navigate(`/product/${product._id}`)
							}
							product={product}
						/>
					))}
				</LazyMotion>
			</div>
			<div className="pt-5 flex justify-center w-full">
				<button
					onClick={() => navigate("/products")}
					className="text-sm  cursor-pointer flex items-center justify-center gap-2 lg:text-lg w-full  text-gray-600 hover:text-[#0C0C0C] transition duration-200 font-ysabeau "
				>
					View More <FaArrowRightLong />
				</button>
			</div>
		</main>
	);
};

export default RandomProduct;
