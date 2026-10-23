import runningImage from "@/assets/heroSection/discountpages_-_Copy_1200x800.webp";
import discountImage from "@/assets/heroSection/dicountmaget.webp";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Discover = () => {
	const items = [
		{
			image: "/homeSection/discover1.jpg",
			label: "30% OFF",
			title: "Explore the Man Collection",
			url: "/products?category=Man",
		},
		{
			image: "/homeSection/discover2.jpg",
			label: "30% OFF",
			title: "Check out today's Discounted products.",
			url: "/products?discount=true",
		},
	];

	const navigate = useNavigate();
	return (
		<div className="h-auto w-full py-16 px-2">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{items.map((i) => (
					<div className="relative h-80 xl:h-120 w-full">
						<img
							src={i.image}
							alt={i.title}
							className="w-full h-full object-center object-cover"
						/>
						<div className="absolute inset-0 bg-black/20 flex flex-col w-full h-full gap-4 justify-between p-6">
							<div className="w-full flex justify-end">
								<div className="bg-white rounded-sm p-2 w-20 flex justify-center items-center">
									<p className="text-xs font-bold">
										{i.label}
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<h1 className="text-3xl text-white">
									{i.title}
								</h1>
								<button
									onClick={() => navigate(`${i.url}`)}
									className="flex items-center justify-center font-semibold gap-2 py-2 px-4 bg-white text-[#0C0C0C] w-1/2 md:w-1/4 hover:bg-black hover:text-white transition duration-300"
								>
									Shop Now <FaArrowRightLong />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Discover;
