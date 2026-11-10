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
import AnimatedElement from "@/components/animation/AnimatedElement";

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
            <div className="flex flex-col md:flex-row w-full h-auto xl:h-170 bg-[#ffff]">
                <div className="w-full md:w-full flex flex-col md:flex-row place-items-center">
                    <div className=" relative w-full xl:w-2/3 h-150 xl:h-full ">
                        <div className="w-full h-full">
                            <img
                                src="/homeSection/discountImage.jpg"
                                alt=""
                                className="w-full h-150 xl:h-full  object-center object-cover"
                            />
                        </div>
                        <div className="flex absolute bg-black/40 inset-0 flex-col justify-center items-center">
                            <div className=" flex flex-col justify-center items-center p-4">
                                <span className="text-white text-sm md:text-xs lg:text-xl xl:text-lg">
                                    Daily Discount
                                </span>
                                <h1 className="text-white  text-4xl text-center xl:text-6xl font-moda">
                                    Save 30% on Today’s Picks
                                </h1>
                                <p className="text-white text-sm md:text-xs xl:text-lg max-w-lg text-center">
                                    The discounted collection is updated every
                                    24 hours—pick your favorites before it
                                    changes.
                                </p>
                            </div>
                            <div>
                                <div className="flex flex-col   gap-3 mt-2">
                                    <div className="w-full ">
                                        <CountdownTimer
                                            expiresAt={mainProduct?.expiresAt}
                                            onExpire={() => {
                                                console.log("Discount expired");
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="w-full flex justify-center items-center">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    "/products?discount=true",
                                                )
                                            }
                                            className=" flex items-center font-semibold justify-center gap-3 py-5 px-7 bg-transparent border border-white hover:bg-white hover:text-black text-white text-sm md:text-xs lg:text-sm transition duration-200"
                                        >
                                            SHOP THE DROP <FaArrowRightLong />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#F1EEEA] hidden xl:block p-3 w-full h-full md:w-1/3">
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
