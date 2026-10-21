import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import discountImage from "@/assets/discountImage(1).webp";
import { getDiscountProducts } from "@/features/products/services/productService";
import MobileBestSeller from "@/features/bestSeller/components/MobileBestSeller";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { FaArrowRightLong } from "react-icons/fa6";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import ProductCard from "@/features/products/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { LazyMotion, domAnimation } from "framer-motion";
import ProductsSwiper from "@/features/products/components/ProductsSwiper";

const OnSale = () => {
    const [product, setProduct] = useState([]);
    const fetchProducts = async () => {
        try {
            const res = await getDiscountProducts();
            setProduct(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const mainProduct = product[0];
    const otherProduct = product.slice(1).map((discount) => ({
        ...discount.productId,
        discountPercent: discount.discountPercent,
        discountPrice: discount.discountPrice,
    }));

    const navigate = useNavigate();
    console.log(otherProduct);
    return (
        <main className=" mt-6 flex justify-center w-full pb-6 h-auto">
            <div className="flex flex-col md:flex-row w-full h-auto bg-[#ffff]">
                <div className="w-full md:w-full flex flex-col md:flex-row palce-items-center">
                    <div className="bg-black w-full h-100 md:h-80 lg:h-full p-4 flex flex-col gap-4 justify-center">
                        <div className=" flex flex-col justify-center ">
                            <h1 className="text-white text-5xl md:text-4xl lg:text-4xl xl:text-7xl font-moda">
                                DAILY{" "}
                                <span className="text-[#D2A14A]">DROP</span>
                            </h1>
                            <p className="text-white text-sm md:text-xs lg:text-xl xl:text-xl">
                                Get a 30% discount on selected products.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm md:text-xs lg:text-sm xl:text-lg font-light text-white">
                                NEXT DROP IN
                            </p>
                            <div className="flex flex-col xl:flex-row gap-3 mt-2">
                                <div className="w-full xl:w-1/2">
                                    <CountdownTimer
                                        expiresAt={mainProduct?.expiresAt}
                                        onExpire={() => {
                                            console.log("Discount expired");
                                        }}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full xl:w-1/2 flex items-center">
                                    <button
                                        onClick={() =>
                                            navigate("/products?discount=true")
                                        }
                                        className="w-full flex items-center font-semibold justify-center gap-3 py-5 bg-transparent border border-white hover:bg-white hover:text-black text-white text-sm md:text-xs lg:text-sm transition duration-200"
                                    >
                                        SHOP THE DROP <FaArrowRightLong />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="flex text-sm md:text-xs lg:text-sm gap-4 text-white items-center">
                                <div className="flex text-[#D2A14A]">
                                    <TfiLayoutLineSolid />
                                    <TfiLayoutLineSolid />
                                </div>
                                PREMIUM DISCOUNT EVERYDAY
                            </p>
                        </div>
                    </div>
                    <div
                        className="bg-[#FBFAF7] relative w-full h-100 lg:h-auto flex justify-between bg-center bg-cover  p-6"
                        style={{
                            backgroundImage: `url(${mainProduct?.productId?.image})`,
                        }}
                    >
                        <div className="pt-7 w-full h-full flex flex-col  justify-end">
                            <p className="text-xl font-bold">
                                {mainProduct?.productId?.name}
                            </p>
                            <p className="text-lg  ">
                                {mainProduct?.productId?.brand} /{" "}
                                {mainProduct?.productId?.category}
                            </p>
                            <div className="flex gap-2 text-lg">
                                <p className="line-through text-lg font-semibold">
                                    ${mainProduct?.productId?.price.toFixed(2)}
                                </p>
                                <p className="text-xl  font-bold">
                                    ${mainProduct?.discountPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="px-4 h-10 flex items-center rounded-lg bg-[#D2A14A] text-black">
                            <p className="text-lg">
                                -{mainProduct?.discountPercent}%
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#F1EEEA] p-3">
                        <div className="py-3 px-3 border-b border-gray-400">
                            <p className="text-lg text-gray-700">
                                Other Discount Products
                            </p>
                        </div>
                        <LazyMotion features={domAnimation}>
                            <ProductsSwiper
                                products={otherProduct}
                                navigate={navigate}
                            />
                        </LazyMotion>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OnSale;
