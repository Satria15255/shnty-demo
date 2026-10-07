import { GiCardboardBoxClosed, GiRunningShoe } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdShoppingBag } from "react-icons/md";

export const dashboardConfig = [
	{
		key: "stock",
		title: "Stock",
		icon: <GiCardboardBoxClosed />,
	},
	{
		key: "products",
		title: "Products",
		icon: <GiRunningShoe />,
	},
	{
		key: "orders",
		title: "Completed Orders",
		icon: <BsFillCartCheckFill />,
	},
	{
		key: "productSold",
		title: "Product Sold",
		icon: <MdShoppingBag />,
	},
];
