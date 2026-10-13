import {
    PiInstagramLogoBold,
    PiFacebookLogoBold,
    PiPhoneBold,
} from "react-icons/pi";
import brandLogo1 from "@/assets/logo/brandLogo(1).webp";
import brandLogo2 from "@/assets/logo/brandLogo.webp";
import visa from "@/assets/logo/visa.svg";
import mastercard from "@/assets/logo/mastercard.svg";

const Footer = () => {
    return (
        <div className="flex flex-col bg-gray-100 justify-center items-center h-auto font-montserrat ">
            <div className="flex flex-col md:flex-row justify-between gap-4 px-2 md:px-7 xl:px-6 py-6 md:py-12 w-full ">
                <div className="flex flex-col  gap-5">
                    <h1
                        onClick={() => navigate("/")}
                        className="w-full h-auto text-4xl font-moda"
                    >
                        S H N TY
                    </h1>
                    <div>
                        <p className="text-[10px] max-w-xs lg:text-xs ">
                            From casual looks to streetwear, every pair is
                            crafted to support your active and confident
                            lifestyle.
                        </p>
                    </div>
                    <div className="flex gap-4 text-white ">
                        <p className="bg-black p-2 rounded-full">
                            <PiInstagramLogoBold />
                        </p>
                        <p className="bg-black p-2 rounded-full">
                            <PiFacebookLogoBold />
                        </p>
                        <p className="bg-black p-2 rounded-full">
                            <PiPhoneBold />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col space-y-1">
                    <p className="text-lg font-bold pb-5">Shop</p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        Best Seller
                    </p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        Latest Arrival
                    </p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        On Promo
                    </p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        Product
                    </p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        Product Category
                    </p>
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-lg font-bold pb-5">Support</p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        How to Shop
                    </p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">FAQ</p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        Return Policy
                    </p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        Terms of Service
                    </p>
                    <p className="text-xs  md:text-[10px] lg:text-sm">
                        Privacy & Security
                    </p>
                </div>

                <div className="space-y-3">
                    <p className="text-lg font-bold pb-5">Contact</p>
                    <div className="space-y-1 text-sm text-gray-600">
                        <p>support@zafaris.com</p>
                        <p>+62 812-3456-7890</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row lg:items-center border-t border-gray-400 justify-between px-2 md:px-10 lg:px-2">
                <div>
                    <p className="text-[6px] md:text-[8px] lg:text-xs  md:pb-3">
                        Copyright© 2025 Zafaris.Co All rights reserved.
                    </p>
                </div>
                <div className="flex gap-3 ">
                    <img src={visa} className="w-12 h-auto " alt="Visa Card" />
                    <img
                        src={mastercard}
                        className="w-12 h-auto "
                        alt="Mastercard"
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;
