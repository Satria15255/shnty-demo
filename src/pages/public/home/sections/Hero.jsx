import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/features/products/services/productService";
import heroMobile from "@/assets/heroSection/heroBackground(1).webp";
import { FaArrowRightLong } from "react-icons/fa6";
import { optimizeCloudinaryImage } from "@/helper/optimizeCloudinaryImage";
import AnimatedElement from "@/components/animation/AnimatedElement";

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
        <main className="  w-full h-150 lg:h-120 xl:h-screen  ">
            <div className="relative animate-hero-image inset-0 bg-cover bg-center">
                <div className="grid grid-cols-2 h-150 xl:h-screen">
                    <img
                        src="/homeSection/heroImages.jpg"
                        alt=""
                        className=" h-150 xl:h-screen w-full object-bottom object-cover"
                    />
                    <img
                        src="/homeSection/heroImages2.jpg"
                        alt=""
                        className="bg-center h-150 xl:h-screen w-full object-bottom object-cover"
                    />
                </div>

                <div className="absolute inset-0 bg-black/30 z-20 flex flex-col justify-center items-center h-full w-full md:p-5 ">
                    <div className="w-full font-sans flex flex-col text-white  items-center gap-3 p-3 justify-center">
                        <span className=" text-sm lg:text-lg max-w-xs text-center ">
                            New Collection
                        </span>
                        <h1 className="text-2xl lg:text-2xl 2xl:text-6xl font-moda text-center">
                            Looking Elegant in Simplicity Every Day
                        </h1>
                        <p className="hidden md:block text-sm lg:text-lg max-w-sm text-center ">
                            The Women’s Collection features modern cuts that are
                            comfortable to wear.
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className="flex items-center gap-2 px-5 py-3 border border-white text-sm md:text-xs lg:text-sm hover:bg-white hover:text-black transition duration-200"
                        >
                            EXPLORE COLLECTION <FaArrowRightLong />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Hero;
