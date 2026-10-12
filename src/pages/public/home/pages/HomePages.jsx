import Hero from "@/pages/public/home/sections/Hero";
import Discover from "@/pages/public/home/sections/Discover";
import CallAction from "@/pages/public/home/sections/CallAction";
import BestSeller from "@/pages/public/home/sections/BestSeller";
import DiscountSection from "@/pages/public/home/sections/Discount";
import NewArrival from "@/pages/public/home/sections/NewArrival";
import CategoryCollection from "@/pages/public/home/sections/CategorySection";

const HomePages = () => {
	return (
		<main className="flex flex-col items-center  overflow-hidden">
			<Hero />
				<Discover />
				<BestSeller />
				<DiscountSection />
				<NewArrival />
				<CategoryCollection />
			<CallAction />
		</main>
	);
};

export default HomePages;
