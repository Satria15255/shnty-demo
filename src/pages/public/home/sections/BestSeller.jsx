import { useEffect, useState } from "react";
import { getBestSellingProducts } from "@/features/products/services/productService";
import { useNavigate } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import useMediaQuery from "@/helper/useMediaQuery";
import DesktopBestSeller from "@/features/bestSeller/components/DesktopBestSeller";
import MobileBestSeller from "@/features/bestSeller/components/MobileBestSeller";
import ProductsSwiper from "@/features/products/components/ProductsSwiper";

const Bestseller = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const isMobile = useMediaQuery("(max-width : 767px)");

    const fetchProducts = async () => {
        try {
            const res = await getBestSellingProducts();
            setProducts(res.data);
        } catch (err) {
            console.log("Failed to fetch best sellers:", err);
        }
    };

    console.log("ini dari filter", products);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main className="mb-6 lg:mb-12 flex flex-col items-center w-full">
            <header className="flex  justify-between w-full px-2 md:px-7 items-center py-4 ">
                <p className="text-sm md:text-lg lg:text-2xl font-montserrat font-semibold border-b border-yellow-600 py-2">
                    Best Deals
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="text-sm lg:text-lg text-gray-700 font-ysabeau border-b my-2"
                >
                    View Collection
                </button>
            </header>
            <section className="w-full">
                <LazyMotion features={domAnimation}>
                    {isMobile ? (
                        <MobileBestSeller
                            products={products}
                            navigate={navigate}
                        />
                    ) : (
                        <DesktopBestSeller
                            products={products}
                            navigate={navigate}
                        />
                    )}
                </LazyMotion>
            </section>
        </main>
    );
};

export default Bestseller;
