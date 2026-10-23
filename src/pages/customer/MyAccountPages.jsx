import { MdCheckCircleOutline } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";
import { useAuth } from "@/context/AuthContext";
import { TfiWallet } from "react-icons/tfi";
import { FaBoxesPacking } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";

const MyAccount = () => {
	const { user, setUser } = useAuth();

	const orderStatusInfo = [
		{
			title: "To Paid",
			icon: <TfiWallet />,
			valueOrders: "2",
		},
		{
			title: "Processing",
			icon: <FaBoxesPacking />,
			valueOrders: "2",
		},
		{
			title: "Delivered",
			icon: <TbTruckDelivery />,
			valueOrders: "2",
		},
		{
			title: "Completed",
			icon: <GrCompliance />,
			valueOrders: "2",
		},
	];

	return (
		<main className="min-h-screen  flex flex-col gap-3 p-3 pt-16 mt-12">
			<section className="flex items-center   gap-4  h-auto w-full  border bg-white border-gray-200 rounded-2xl p-6">
				<div className="flex  items-center justify-center">
					<div className="text-6xl">
						<PiUserCircle />
					</div>
					<div className="flex flex-col ">
						<h1 className="text-2xl font-montserrat font-semibold">
							{user?.name || "userName"}
						</h1>

						<div className=" inline-flex items-center gap-1   text-green-700  rounded-full text-xs">
							<p className="text-sm text-gray-500">
								{user?.email || "useremail@gmail.com"}
							</p>
							<MdCheckCircleOutline size={15} />
						</div>
					</div>
				</div>
			</section>
			<section className="border bg-white border-gray-200 p-5 gap-4 rounded-2xl h-auto">
				<div className="text-xs flex justify-between pb-3 mb-3  border-b border-gray-300">
					<h1 className="font-semibold">My Orders</h1>
					<button className="font-light underline text-gray-600">
						View All
					</button>
				</div>
				<div className="grid grid-cols-4 gap-5">
					{orderStatusInfo.map((o) => (
						<div className="flex flex-col justify-center items-center space-y-3">
							<span className="text-4xl">{o.icon}</span>
							<h1 className="text-sm">{o.title}</h1>
							<span className="text-xs">{o.valueOrders}</span>
						</div>
					))}
				</div>
			</section>
			<section className="flex flex-col gap-2 justify-center rounded-2xl">
				<button className="flex justify-between items-center text-sm border bg-white border-gray-200 p-5 rounded-2xl">
					Profile <IoIosArrowForward />
				</button>
				<button className="flex justify-between items-center text-sm border bg-white border-gray-200 p-5 rounded-2xl">
					Address Management <IoIosArrowForward />
				</button>
				<button className="flex justify-between items-center text-sm border bg-white border-gray-200 p-5 rounded-2xl">
					Favorites Products <IoIosArrowForward />
				</button>
				<button className="flex justify-between items-center text-sm border bg-white border-gray-200 p-5 rounded-2xl">
					Password Management <IoIosArrowForward />
				</button>
			</section>
		</main>
	);
};

export default MyAccount;
