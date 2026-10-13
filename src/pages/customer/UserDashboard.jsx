import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PiUserCircle } from "react-icons/pi";
import {
    FaShoppingBag,
    FaSignOutAlt,
    FaUserCircle,
    FaLockOpen,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import MyOrdersPage from "./MyOrderPages";
import ProfilePage from "./ProfilePages";
import AddressPage from "./AddressPages";
import ChangePassword from "./ChangePassword";

const UserDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const tab = searchParams.get("tab") || "profile";

    const handleLogout = () => {
        logout();
        toast.success("Logout Successfully");
    };

    return (
        <main className="flex justify-center bg-[#FAFAFA] w-full">
            <div className="flex w-full max-w-7xl lg:min-h-screen pt-16 lg:mt-13">
                {/* Sidebar */}
                <aside className="hidden w-1/4 md:flex flex-col items-start p-3 gap-3 border-r border-gray-300">
                    <div className="pb-5 border-b w-full">
                        <p className="text-lg">Hello {user?.name}</p>
                    </div>
                    <nav className="w-full space-y-4">
                        <button
                            className={`w-full rounded-3xl text-left flex gap-3 items-center p-3 hover:bg-black hover:text-white transition duration-200 ${tab === "profile" ? "bg-black text-white" : ""}`}
                            onClick={() => setSearchParams({ tab: "profile" })}
                        >
                            <FaUserCircle size={20} />
                            Profile
                        </button>
                        <button
                            className={`w-full  rounded-3xl text-left flex gap-3 items-center p-3 hover:bg-black hover:text-white transition duration-200 ${tab === "my-orders" ? "bg-black text-white" : ""}`}
                            onClick={() =>
                                setSearchParams({ tab: "my-orders" })
                            }
                        >
                            <FaShoppingBag size={20} />
                            My Orders
                        </button>
                        <button
                            className={`w-full  rounded-3xl text-left flex gap-3 items-center p-3 hover:bg-black hover:text-white transition duration-200 ${tab === "addresses" ? "bg-black text-white" : ""}`}
                            onClick={() =>
                                setSearchParams({ tab: "addresses" })
                            }
                        >
                            <FaMapLocationDot size={20} />
                            My Address
                        </button>
                        <button
                            className={`w-full  rounded-3xl text-left flex gap-3 items-center p-3 hover:bg-black hover:text-white transition duration-200 ${tab === "change-password" ? "bg-black text-white" : ""}`}
                            onClick={() =>
                                setSearchParams({ tab: "change-password" })
                            }
                        >
                            <FaLockOpen size={20} />
                            Change Password
                        </button>
                        <button
                            className={`w-full rounded-3xl text-left flex gap-3 items-center p-3 hover:bg-red-500 hover:text-white transition duration-200`}
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt size={20} /> Logout
                        </button>
                    </nav>
                </aside>
                {/* Main Content */}
                <section className="ml-auto w-full h-auto bg-[#FAFAFA]">
                    {tab === "profile" && <ProfilePage />}
                    {tab === "my-orders" && <MyOrdersPage />}
                    {tab === "addresses" && <AddressPage />}
                    {tab === "change-password" && <ChangePassword />}
                </section>
            </div>
        </main>
    );
};

export default UserDashboard;
