import DashboardStatsCard from "@/components/admin/ui/DashboardStatsCard";
import {
	getSalesData,
	getDashboardSummary,
} from "@/pages/admin/dashboard/services/adminDashboardService";
import { getAllTransactions } from "@/pages/admin/orders/services/adminOrderService";
import { getAllProducts } from "@/pages/products/services/productService";
import React, { useState, useEffect } from "react";
import { dashboardConfig } from "@/pages/admin/dashboard/config/DashboardConfig";
import { MdOutlineCalendarMonth } from "react-icons/md";
import DatenTimeFormat from "@/components/shared/DatenTimeFormat";
import SalesChart from "@/pages/admin/dashboard/components/SalesChart";
import LatestTransactionsTabel from "@/pages/admin/dashboard/components/LatestTransactionsTabel";
import TopProductCard from "@/pages/admin/dashboard/components/TopProductCard";
import { useAuth } from "@/context/AuthContext";

import { getGreeting, isWeekend } from "@/utils/GetGreeting";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
	BsArrowDownRightCircleFill,
	BsArrowUpRightCircleFill,
} from "react-icons/bs";

const AdminDashboard = () => {
	const { user, setUser } = useAuth();
	const [summary, setSummary] = useState([]);
	const [salesChart, setSalesChart] = useState([]);
	const [range, setRange] = useState("7d");
	const [order, setOrder] = useState([]);
	const [products, setProducts] = useState([]);
	const ranges = [
		{
			label: "7D",
			value: "7d",
		},
		{
			label: "30D",
			value: "30d",
		},
		{
			label: "90D",
			value: "90d",
		},
		{
			label: "1Y",
			value: "1y",
		},
	];

	// Fetch Dashboard Stats
	const loadDashboard = async () => {
		try {
			const [summaryRes, chartRes] = await Promise.all([
				getDashboardSummary(range),
				getSalesData(range),
			]);

			setSummary(summaryRes.data);
			setSalesChart(chartRes.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadDashboard();
	}, [range]);

	// fetch last / newest transactions(order)
	const fetchOrders = async () => {
		const res = await getAllTransactions();
		setOrder(res.data);
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	// Sort Order
	const sortOrders = [...order].sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
	);

	const lastOrders = sortOrders.slice(0, 5);

	// fetch top product
	const fetchProducts = async () => {
		try {
			const res = await getAllProducts();
			setProducts(res.data);
		} catch (err) {
			console.log("Failed to fetch best sellers:", err);
		}
	};
	const bestSellingProducts = products.filter(
		(product) => product.isBestSeller === true,
	);
	console.log("ini dari filter", bestSellingProducts);

	useEffect(() => {
		fetchProducts();
	}, []);

	console.log("summary ", summary);

	<dashboardConfig items={summary} />;

	return (
		<main className="w-full p-5 bg-slate-50">
			<header className="flex justify-between items-center border-b border-gray-300 py-4 px-2">
				<div>
					<h2>
						{getGreeting()}, {user?.name} 👋
					</h2>
					<p className="text-sm">
						{isWeekend()
							? "Happy Weekend !!, Take some time to recharge."
							: "Here's what's happening in your store today"}
					</p>
				</div>
				<div className="flex items-center gap-3 text-sm">
					<p className="p-2 text-3xl bg-gray-200 rounded-full">
						<MdOutlineCalendarMonth />
					</p>
					<h2>
						<DatenTimeFormat />
					</h2>
				</div>
			</header>
			<div className="mt-4 w-full">
				<section className="flex justify-around gap-4">
					{dashboardConfig.map((item) => (
						<DashboardStatsCard
							key={item.key}
							title={item.title}
							data={summary[item.key]}
							icon={item.icon}
						/>
					))}
				</section>

				{/*Sales Chart*/}
				<div className=" gap-4 w-full h-auto ">
					<section className="mt-6 flex flex-col bg-white justify-around border border-gray-300 rounded-xl w-full">
						<div className="flex gap-2">
							<div className="flex flex-col justify-between p-5 w-2/5">
								<div>
									<h2>Your Sales Report</h2>
									<p className="text-sm  text-gray-700">
										Look at your sales
									</p>
								</div>
								<div>
									<p className="text-6xl font-semibold">
										${summary?.revenue?.total}
									</p>
									{summary?.revenue?.trend === "up" ? (
										<p className="text-green-700 flex gap-1 items-center text-lg">
											<BsArrowUpRightCircleFill />+ $
											{summary?.revenue?.difference}(
											{summary?.revenue?.percentage}%)
										</p>
									) : (
										<p className="text-red-700 flex gap-1 items-center text-lg">
											<BsArrowDownRightCircleFill />
											{summary?.revenue?.percentage}%
										</p>
									)}
								</div>
								<div className="flex gap-3">
									{ranges.map((item) => (
										<button
											key={item.value}
											onClick={() => setRange(item.value)}
											className={`w-12 py-2 rounded-xl border border-gray-300 transition-all duration-200 text-sm
        ${
			range === item.value
				? "bg-black text-white shadow-md"
				: " hover:bg-gray-300 text-gray-700"
		}`}
										>
											{item.label}
										</button>
									))}
								</div>
							</div>
							<SalesChart data={salesChart} />
						</div>
					</section>

					<div className="flex w-full gap-5">
						<section className="w-full">
							<LatestTransactionsTabel order={lastOrders} />
						</section>
						{/*Best Selling Products*/}
						<section className="w-2/5 flex flex-col gap-2 bg-gray-900 text-white rounded-3xl h-auto justify-center mt-2 lg:mt-4 p-2 shadow-lg">
							<div className="flex flex-col justify-center mt-2">
								<p className=" text-xl text-[#F3E5AB] font-semibold font-sans pl-2">
									Top Selling Products
								</p>
							</div>
							{/* Slider */}
							<Swiper
								modules={[Pagination, Autoplay]}
								slidesPerView={1}
								slidesPerGroup={1}
								autoplay={{ delay: 4000 }}
								pagination={{
									el: ".swiper-pagination",
									clickable: true,
								}}
								className="h-auto w-full flex justify-center"
							>
								{bestSellingProducts.map((products, index) => (
									<SwiperSlide
										key={index}
										className="pb-8 w-full"
									>
										<TopProductCard
											key={products._id}
											product={products}
										/>
									</SwiperSlide>
								))}

								{/* Navigation & Pagination */}
								<div className="swiper-pagination"></div>
							</Swiper>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AdminDashboard;
