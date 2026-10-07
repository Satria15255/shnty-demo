import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logoBrand from "@/assets/logo/brandLogo.png";
import { useSearchParams, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/admin/dashboard",
    },
    {
      name: "Product",
      icon: <FaBox />,
      path: "/admin/product",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/all-orders",
    },
    {
      name: "Customer",
      icon: <FaUser />,
      path: "/admin/user",
    },
  ];

  const menuClass = ({ isActive }) =>
    `flex text-sm items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
  ${isActive ? "bg-gray-900 text-[#F3E5AB] shadow-sm shadow-[#F3E5AB]" : "text-gray-600 hover:bg-gray-200"}`;

  console.log(menuItems);
  return (
    <div className="h-screen bg-gray-900 border-r border-gray-300 flex flex-col">
      {/* Header / Logo */}
      <div className="p-4 py-8 text-sm font-bold ">
        <img src={logoBrand} alt="brand logo" className="w-3/4" />
      </div>

      {/* Menu Items (otomatis memenuhi tinggi dengan flex-1) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <p className="text-sm text-gray-400 pb-2">Main Menu</p>
        {menuItems.map((i) => (
          <NavLink to={i.path} className={menuClass}>
            {i.icon}
            {i.name}
          </NavLink>
        ))}
      </div>

      {/* Logout (tetap di bawah) */}
      <div className="p-4 border-t border-gray-700">
        <NavLink
          as={NavLink}
          to="/"
          label="Logout"
          className="font-bold flex items-center gap-2 text-sm text-red-500"
        >
          <FaSignOutAlt />
          Log Out
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
