import { FaBars } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import brandLogo1 from "@/assets/logo/brandLogo(1).webp";
import brandLogo2 from "@/assets/logo/brandLogo.webp";
import SidebarMobile from "./SidebarMobile";
import SearchModal from "@/features/search/components/SearchModal";
import CatalogDropdown from "./NavbarDropdown";
import { IoHeartOutline, IoSearchOutline, IoBagOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";

function Navbar({ handleOpenCart, onToggleSidebar }) {
    const [scrolled, setScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // HANDLE NAVIGATION TO FAVORITES
    const handleFavoriteNav = () => {
        if (user) {
            navigate("/my-favorite");
        } else {
            navigate("/login");
        }
    };

    return (
        <div
            className={`fixed top-0 z-40   font-ysabeau md:pb-5   py-3 md:py-4 lg:py-7 md:h-auto  w-full md:w-full flex flex-col justify-center items-center transition-all duration-300 ease-in-out
  ${scrolled ? "   bg-[#F1EEEA]    " : ""}`}
        >
            {/* Top Section */}
            <div className="grid grid-cols-3 place-items-center w-full px-7">
                <div className=" gap-7 hidden lg:flex  font-semibold text-xs lg:text-sm items-center w-full">
                    <p
                        onClick={() => navigate("/")}
                        className="cursor-pointer border-b border-transparent hover:border-black transition duration-300 pb-3 pt-3"
                    >
                        HOME
                    </p>
                    <p
                        onClick={() => navigate("/products")}
                        className="cursor-pointer border-b border-transparent hover:border-black transition duration-300 pb-3 pt-3"
                    >
                        SHOP
                    </p>
                    <CatalogDropdown />
                </div>
                <div className="flex items-center justify-center ">
                    {/* Hamburger icon */}
                    <button
                        aria-label="Open navigation menu"
                        onClick={() => setIsSidebarOpen(true)}
                        className="relative md:hidden text-lg px-2 hover:text-yellow-500 transition duration-100"
                    >
                        <FaBars />
                    </button>
                    <h1
                        onClick={() => navigate("/")}
                        className="w-full h-auto text-4xl font-moda"
                    >
                        S H N TY
                    </h1>
                </div>
                <div className="flex justify-end gap-3 lg:gap-6 items-center w-full ">
                    <div className="flex justify-center items-center w-full ">
                        <SearchModal />
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            aria-label="Open favorites"
                            onClick={handleFavoriteNav}
                            className="text-2xl border-b border-transparent hover:border-black  transition duration-300 pb-3 pt-3"
                        >
                            <IoHeartOutline />
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            aria-label={`Open shopping cart, ${totalItems} items`}
                            onClick={handleOpenCart}
                            className="relative text-2xl border-b border-transparent hover:border-black transition duration-300 pb-3 pt-3"
                        >
                            <IoBagOutline />
                            {totalItems > 0 && (
                                <span className="absolute top-2 right-4 bg-red-500 text-white bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    <p>{totalItems}</p>
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="hidden md:flex items-center min-w-20">
                        {user ? (
                            <button
                                aria-label="User Profile"
                                onClick={onToggleSidebar}
                                className="relative flex items-center text-2xl gap-2 hidden md:flex border-b border-transparent hover:border-black pb-3 pt-3 transition duration-300"
                            >
                                <LuUserRound />{" "}
                            </button>
                        ) : (
                            <button
                                aria-label="Login Navigation"
                                onClick={() => navigate("/login")}
                                className="text-2xl border-b border-transparent hover:border-black transition duration-300 pb-3 pt-3"
                            >
                                {" "}
                                <LuUserRound />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Bottom Section */}

            {isSidebarOpen && (
                <SidebarMobile
                    user={user}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}
            {isSearchOpen && (
                <SearchModal onClose={() => setIsSearchOpen(false)} />
            )}
        </div>
    );
}

export default Navbar;
