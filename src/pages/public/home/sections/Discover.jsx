import runningImage from "@/assets/heroSection/discountpages_-_Copy_1200x800.webp";
import discountImage from "@/assets/heroSection/dicountmaget.webp";

import { FaArrowRightLong } from "react-icons/fa6";

const Discover = () => {
	return (
		<div className="h-auto py-16">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="relative h-80">
					<img
						src="/homeSection/discover1.jpg"
						alt="run"
						className="w-full h-full object-center object-cover"
					/>
					<div className="absolute inset-0 bg-black/20 flex flex-col gap-4 justify-between p-6">
						<div className="bg-white rounded-sm p-2 w-20 flex justify-center items-center">
							<p className="text-xs font-bold">30% OFF</p>
						</div>
						<div className="flex flex-col gap-3">
							<h1 className="text-3xl text-white">
								Explore the <br /> Man collection
							</h1>
							<button className="flex items-center justify-center font-semibold gap-2 py-2 px-4 bg-white text-[#0C0C0C] w-1/2 md:w-1/4">
								Shop Now <FaArrowRightLong />
							</button>
						</div>
					</div>
				</div>
				<div className="relative h-80">
					<img
						src="/homeSection/discover2.jpg"
						alt="run"
						className="w-full h-full object-center object-cover"
					/>
					<div className="absolute inset-0 bg-black/20 flex flex-col gap-4 justify-between p-6">
						<div className="bg-white rounded-sm p-2 w-20 flex justify-center items-center">
							<p className="text-xs font-bold">30% OFF</p>
						</div>
						<div className="flex flex-col gap-3">
							<h1 className="text-3xl text-white">
								Check out today's <br /> Discounted products.
							</h1>
							<button className="flex items-center justify-center font-semibold gap-2 py-2 px-4 bg-white text-[#0C0C0C] w-1/2 md:w-1/4">
								Shop Now <FaArrowRightLong />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Discover;
