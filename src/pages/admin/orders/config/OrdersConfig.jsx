import {
	TbShoppingBag,
	TbShoppingBagCheck,
	TbShoppingBagX,
	TbShoppingBagExclamation,
} from "react-icons/tb";

export const ordersConfig = [
	{
		key: "totalOrders",
		title: "Total Orders",
		icon: <TbShoppingBag />,
	},
	{
		key: "completedOrders",
		title: "Complete Orders",
		icon: <TbShoppingBagCheck />,
	},
	{
		key: "cancelledOrders",
		title: "Cancel Orders",
		icon: <TbShoppingBagX />,
	},
	{
		key: "progressOrders",
		title: "On Progress",
		icon: <TbShoppingBagExclamation />,
	},
];
