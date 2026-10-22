import { useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import { useAuth } from "@/context/AuthContext";
import brandLogo1 from "@/assets/logo/brandLogo(1).webp";
import brandLogo2 from "@/assets/logo/brandLogo.webp";
import CatalogDropdown from "@/components/layout/NavbarDropdown";
import { FaBars } from "react-icons/fa";

const SidebarMobile = ({ onClose }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        onClose();
        toast.success("Logout Successfully");
    };

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };
    return (
        <div className="fixed bg-black/20 z-0 inset-0 flex justify-start">
            <div className="w-1/2 h-screen z-10 bg-white p-5 flex flex-col ">
                {/* Logos */}
                <div className="flex items-center gap-3 ">
                    <button
                        aria-label="Open navigation menu"
                        onClick={onClose}
                        className="relative lg:hidden text-lg hover:text-yellow-500 transition duration-100"
                    >
                        <FaBars />
                    </button>
                    <h1
                        onClick={() => handleNavigate("/")}
                        className="w-full h-auto  text-xl md:text-4xl font-moda"
                    >
                        S H N TY
                    </h1>
                </div>
                {/* User Validation */}
                <div>
                    {user && (
                        <div className="relative flex py-4 justify-start items-center gap-1 flex  hover:text-yellow-500 transition duration-100">
                            <PiUserCircle size={40} />{" "}
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                {/* Sidebar Menu */}
                <div className="">
                    <div className="flex flex-col  text-sm ">
                        <p
                            onClick={() => handleNavigate("/")}
                            className="cursor-pointer hover:text-yellow-500 transition duration-100 py-4 border-t border-gray-300"
                        >
                            Home
                        </p>
                        <div className="z-20">
                            <CatalogDropdown onClose={onClose} />
                        </div>
                        {user ? (
                            <>
                                <p
                                    onClick={() =>
                                        handleNavigate("/my-favorite")
                                    }
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    Favorite
                                </p>
                                <p
                                    onClick={() =>
                                        handleNavigate(
                                            "/dashboard?tab=my-orders",
                                        )
                                    }
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    My Orders
                                </p>
                            </>
                        ) : (
                            <div className="text-sm">
                                <p
                                    onClick={() => handleNavigate("/login")}
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    Login
                                </p>
                                <p
                                    onClick={() => handleNavigate("/register")}
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    Register
                                </p>
                            </div>
                        )}
                        {user && (
                            <>
                                <p
                                    onClick={() =>
                                        handleNavigate(
                                            "/dashboard?tab=change-password",
                                        )
                                    }
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    Settings
                                </p>
                                <p
                                    onClick={handleLogout}
                                    className="cursor-pointer text-red-500 py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    Logout
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-screen" onClick={onClose}></div>
        </div>
    );
};

export default SidebarMobile;
