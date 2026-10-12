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
        <section className="relative w-full   h-full h-50 md:h-90 lg:h-120 xl:h-screen  ">
            <div className="absolute  inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/homeSection/hero.png)` }}>
                <div className="relative z-20 flex flex-col justify-center items-center h-full w-full p-5 ">

                    <div className="flex h-full w-full">
                        <div className="flex flex-col justify-center items-center h-full w-full">
                            <div className="w-full flex justify-start items-center h-full pl-16">
                                <h1 className="text-5xl md:text-5xl lg:text-7xl xl:text-9xl text-[#14213D] font-moda  pr-16">
                                    LESS NOISE
                                </h1>
                            </div>
                            <div className="w-full flex justify-end items-center h-full pr-16">
                                <h1 className="text-5xl md:text-5xl lg:text-7xl xl:text-9xl text-[#14213D] font-moda  pl-16">
                                    MORE STYLE
                                </h1>
                            </div>
                        </div>
                        <div className="w-20 h-full flex items-center">

                            <p className="inline-block -rotate-90 whitespace-nowrap font-moda w-80 flex">S H N T Y - 2 0 2 6</p>
                        </div>
                    </div>


                    <div className="w-full font-sans flex flex-col items-start justify-end">
                        <h1 className="text-2xl font-moda">S H N T Y - EST.2026</h1>
                        <p className="text-sm font-light">Redefining everyday essentials through effortless style and individuality.</p>
                        <button className="flex items-center gap-1 text-sm hover:underline transition duration-200">EXPLORE COLLECTION <FaArrowRightLong /></button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
