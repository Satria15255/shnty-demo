import { IoBagOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";

export const productsManagementConfig = [
	{
		key: "totalStock",
		title: "Stock",
		icon: <BsBoxSeam />,
	},
	{
		key: "productsTotal",
		title: "Product",
		icon: <IoBagOutline />,
	},
	{
		key: "productsCategory",
		title: "Categories",
		icon: <TbCategory2 />,
	},
	{
		key: "productsBrand",
		title: "Brand",
		icon: <CiShoppingTag />,
	},
];
