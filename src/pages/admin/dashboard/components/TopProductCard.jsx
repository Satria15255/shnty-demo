import { FaStar } from "react-icons/fa6";

const TopProductCard = ({ product }) => {
	// Total Product Revenue
	const revenue = product.price * product.totalSold;

	// Total Product Stock
	const productStock = product.variants.map((product) => product.stock);
	let totalStock = 0;
	productStock.forEach((stock) => {
		totalStock += stock;
	});

	// Product Stock Left
	const stockLeft = totalStock - product.totalSold;

	return (
		<div className="flex flex-col gap-3 p-4 items-center h-auto">
			<main className="grid grid-cols-2">
				<div className="flex justify-center">
					<img
						src={product.image}
						alt={product.name}
						className="w-full rounded-2xl"
					/>
				</div>
				<div className="flex flex-col gap-3 p-4 h-full justify-between">
					<div className="flex flex-col justify-around border-b border-[#F3E5AB] h-4/5">
						<p className="text-2xl font-semibold">{product.name}</p>
						<div className="flex items-center gap-1 text-[#F3E5AB]">
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<p>( 5 )</p>
						</div>
						<p className="text-lg">{product.totalSold} Sold</p>
					</div>
					<div className="grid grid-cols-2">
						<p className="text-sm flex flex-col  border-r border-[#F3E5AB]">
							Revenue
							<span className="text-xl text-[#F3E5AB]">
								${revenue}
							</span>
						</p>
						<p className="text-sm flex flex-col pl-2">
							Stock Left
							<span className="text-xl text-[#F3E5AB]">
								{stockLeft}
							</span>
						</p>
					</div>
				</div>
			</main>
			<div className="w-full">
				<button className="p-2 w-full rounded-2xl border border-[#F3E5AB]">
					{" "}
					View Products
				</button>
			</div>
		</div>
	);
};

export default TopProductCard;
