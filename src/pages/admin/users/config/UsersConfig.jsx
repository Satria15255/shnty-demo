import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { PiUserListDuotone } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

export const usersConfig = [
	{
		key: "totalUsersSummary",
		title: "Total User",
		icon: <FaUsers />,
	},
	{
		key: "newUsersSummary",
		title: "New User",
		icon: <FaUserPlus />,
	},
	{
		key: "customersSummary",
		title: "Customers",
		icon: <PiUserListDuotone />,
	},
	{
		key: "adminSummary",
		title: "Admin Account",
		icon: <GrUserAdmin />,
	},
];
