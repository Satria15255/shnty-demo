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
import AnimatedElement from "@/components/animation/AnimatedElement";
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

    const handleViewCart = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/my-cart");
        }
    };

    const handleLogin = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/dashboard?tab=profile");
        }
    };

    return (
        <AnimatedElement
            variant="slideDown"
            duration={0.6}
            className={`fixed top-0 z-40 animate-navbar  font-ysabeau md:pb-5 py-3  pb-3 md:py-2 lg:py-7 md:h-auto  w-full md:w-full flex flex-col justify-center items-center transition-all duration-300 ease-in-out
        }
        }
  ${scrolled ? "   bg-[#F1EEEA]  shadow-md  " : ""}`}
        >
            {/* Top Section */}
            <div className="grid grid-cols-3 place-items-center w-full px-3 lg:px-7">
                <div className=" gap-7 flex  font-semibold text-xs lg:text-sm items-center w-full">
                    <p
                        onClick={() => navigate("/")}
                        className="cursor-pointer hidden lg:block border-b border-transparent hover:border-black transition duration-300 pb-3 pt-3"
                    >
                        HOME
                    </p>
                    <p
                        onClick={() => navigate("/products")}
                        className="cursor-pointer hidden lg:block border-b border-transparent hover:border-black transition duration-300 pb-3 pt-3"
                    >
                        SHOP
                    </p>
                    <div className="hidden lg:block">
                        <CatalogDropdown />
                    </div>
                    {/* Hamburger icon */}
                    <button
                        aria-label="Open navigation menu"
                        onClick={() => setIsSidebarOpen(true)}
                        className="relative lg:hidden text-lg px-2 hover:text-yellow-500 transition duration-100"
                    >
                        <FaBars />
                    </button>
                </div>
                <div className="flex items-center justify-center ">
                    <h1
                        onClick={() => navigate("/")}
                        className="w-full h-auto  text-xl md:text-4xl font-moda"
                    >
                        S H N TY
                    </h1>
                </div>
                <div className="flex justify-end gap-3 lg:gap-6 items-center w-full px-2">
                    <div className="hidden lg:flex justify-center items-center w-full ">
                        <SearchModal />
                    </div>
                    <div className="hidden lg:flex justify-center items-center">
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
                            className="hidden md:block relative text-2xl p-2 hover:text-yellow-500 transition duration-100"
                        >
                            <IoBagOutline />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    <p>{totalItems}</p>
                                </span>
                            )}
                        </button>
                        <button
                            aria-label={`Open shopping cart, ${totalItems} items`}
                            onClick={handleViewCart}
                            className="relative md:hidden text-2xl p-2 hover:text-yellow-500 transition duration-100"
                        >
                            <IoBagOutline />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    <p>{totalItems}</p>
                                </span>
                            )}
                        </button>
                    </div>
                    <div className=" flex md:hidden justify-center items-center">
                        <button
                            aria-label="Login Navigation"
                            onClick={handleLogin}
                            className="text-2xl md:hidden hover:text-yellow-500 transition duration-100"
                        >
                            {" "}
                            <LuUserRound />
                        </button>
                    </div>

                    <div className="hidden md:flex items-center">
                        {user ? (
                            <button
                                aria-label="User Profile"
                                onClick={onToggleSidebar}
                                className="relative  items-center text-2xl gap-2 hidden md:flex hover:text-yellow-500 transition duration-100"
                            >
                                <LuUserRound />{" "}
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
            <div className="flex lg:hidden justify-center md:justify-start items-center w-full  px-3 lg:px-7">
                <SearchModal />
            </div>
            {isSidebarOpen && (
                <SidebarMobile
                    user={user}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}
            {isSearchOpen && (
                <SearchModal onClose={() => setIsSearchOpen(false)} />
            )}
        </AnimatedElement>
    );
}

export default Navbar;
