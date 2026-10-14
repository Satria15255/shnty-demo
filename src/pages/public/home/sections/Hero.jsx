import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/features/products/services/productService";
import heroMobile from "@/assets/heroSection/heroBackground(1).webp";
import { FaArrowRightLong } from "react-icons/fa6";
import { optimizeCloudinaryImage } from "@/helper/optimizeCloudinaryImage";

const Hero = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await getLatestProducts();
            console.log(res.data);
            setProducts(res.data);
            console.log(products);
        } catch (err) {
            console.err("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const newProduct = products[0];

    console.log(newProduct);

    return (
        <section className="relative w-full   h-screen  md:h-120 lg:h-120 xl:h-screen  ">
            <div
                className="absolute animate-hero-image inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/homeSection/hero.png)` }}
            >
                <div
                    className="
    absolute md:hidden bottom-0 left-0 w-full h-[45%] z-0
    bg-gradient-to-t
    from-black/75
    via-black/30
    to-transparent
    pointer-events-none
  "
                />
                <div className="relative z-20 flex flex-col justify-center items-center h-full w-full md:p-5 ">
                    <div className="flex h-full w-full">
                        <div className="flex flex-col justify-center items-center h-full w-full">
                            <div className="w-full flex flex-col justify-center md:justify-end  md:items-start h-full md:pl-16 px-2 md:px-0">
                                <h1 className="text-4xl md:text-5xl  text-left lg:text-7xl xl:text-9xl text-[#14213D] font-moda  pr-16">
                                    LESS NOISE
                                </h1>
                                <div className="w-full flex md:hidden justify-end items-center  md:pr-16">
                                    <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-9xl text-[#14213D] font-moda  pl-16">
                                        MORE STYLE
                                    </h1>
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-end h-full ">
                                <h1 className="text-5xl text-transparent md:text-5xl lg:text-7xl xl:text-9xl md:text-[#14213D] font-moda  md:pl-16">
                                    MORE STYLE
                                </h1>
                            </div>
                        </div>
                        <div className="hidden w-15 h-full md:flex items-center">
                            <p className="inline-block -rotate-90 whitespace-nowrap font-moda w-80">
                                S H N T Y - 2 0 2 6
                            </p>
                        </div>
                    </div>

                    <div className="w-full font-sans flex flex-col text-white md:text-black items-center md:items-start pb-10 md:pb-0 justify-end">
                        <h1 className="text-2xl md:text-sm lg:text-2xl font-moda">
                            S H N T Y - EST.2026
                        </h1>
                        <p className="text-sm max-w-xs md:text-xs lg:text-sm font-light text-center md:text-left">
                            Redefining everyday essentials through effortless
                            style and individuality.
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className="flex items-center gap-1 text-sm md:text-xs lg:text-sm hover:underline transition duration-200"
                        >
                            EXPLORE COLLECTION <FaArrowRightLong />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
