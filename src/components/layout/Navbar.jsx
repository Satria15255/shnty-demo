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
            className={`fixed top-0 z-20 border-b  bg-white font-ysabeau border-gray-200 md:pb-5  md:px-4 py-3 md:py-4 lg:py-7 md:h-auto  w-full md:w-full flex flex-col justify-center items-center transition-all duration-500 ease-in-out
  ${scrolled ? " border-b bg-white border-gray-400   " : ""}`}
        >
            {/* Top Section */}
            <div className="flex  justify-between items-center w-full  xl:px-6">
                <div className="md:flex items-center md:w-2/4">
                    {/* Hamburger icon */}
                    <button
                        aria-label="Open navigation menu"
                        onClick={() => setIsSidebarOpen(true)}
                        className="relative md:hidden text-lg px-2 hover:text-yellow-500 transition duration-100"
                    >
                        <FaBars />
                    </button>
                    <picture
                        onClick={() => navigate("/")}
                        className="hidden md:block w-40 lg:w-50 h-auto"
                    >
                        <source
                            media="(max-width: 640px)"
                            srcSet={brandLogo1}
                            className=""
                        />
                        <img
                            src={brandLogo2}
                            alt="Brand Logo"
                            width="862"
                            height="116"
                        />
                    </picture>
                </div>
                <div className=" gap-7 hidden lg:flex  font-light text-xs lg:text-sm items-center w-full">
                    <p
                        onClick={() => navigate("/")}
                        className="cursor-pointer hover:text-yellow-500 transition duration-100"
                    >
                        HOME
                    </p>
                    <p
                        onClick={() => navigate("/products")}
                        className="cursor-pointer hover:text-yellow-500 transition duration-100"
                    >
                        SHOP
                    </p>
                    <p
                        onClick={() => navigate("/products")}
                        className="cursor-pointer hover:text-yellow-500 transition duration-100"
                    >
                        COLLECTION
                    </p>
                    <p
                        onClick={() => navigate("/products")}
                        className="cursor-pointer hover:text-yellow-500 transition duration-100"
                    ></p>
                </div>

                <div className="flex justify-end gap-3 lg:gap-6 items-center w-full px-2">
                    <div className="flex justify-center items-center w-full ">
                        <SearchModal />
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            aria-label="Open favorites"
                            onClick={handleFavoriteNav}
                            className="text-2xl hover:text-yellow-500 transition duration-100"
                        >
                            <IoHeartOutline />
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            aria-label={`Open shopping cart, ${totalItems} items`}
                            onClick={handleOpenCart}
                            className="relative text-2xl  hover:text-yellow-500 transition duration-100"
                        >
                            <IoBagOutline />
                            {totalItems > 0 && (
                                <span className="absolute top-2 right-4 bg-red-500 text-white bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    <p>{totalItems}</p>
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="hidden md:flex items-center">
                        {user ? (
                            <button
                                aria-label="User Profile"
                                onClick={onToggleSidebar}
                                className="relative flex items-center text-2xl gap-2 hidden md:flex hover:text-yellow-500 transition duration-100"
                            >
                                <LuUserRound />{" "}
                                <span className="hidden lg:flex w-30 text-sm">
                                    Hi {user.name}
                                </span>
                            </button>
                        ) : (
                            <button
                                aria-label="Login Navigation"
                                onClick={() => navigate("/login")}
                                className="text-2xl hover:text-yellow-500 transition duration-100"
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
