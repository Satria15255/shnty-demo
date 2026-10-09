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
        <section className="pt-15 px-2 md:px-4 md:pt-12 xl:pt-15 bg-white md:mt-17 w-full  h-full xl:h-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 text-black gap-4">
                <div className="flex flex-col items-start p-5 justify-center space-y-2 md:space-y-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4 items-center">
                            <div className="bg-gray-400 p-1 rounded-full"></div>
                            <p className="text-md md:text-sm font-montserrat t ">
                                NEW OUTFIT
                            </p>
                        </div>
                        <h1 className="text-5xl md:text-5xl lg:text-7xl xl:text-7xl font-moda  ">
                            Find Your <br /> Signature Outfit
                        </h1>
                    </div>
                    <p className="text-sm leading-tight py-2 max-w-sm md:text-sm lg:text-sm  font-light">
                        Crafted for performance, engineered for silence.
                        Discover sculptural footwear and contemporary
                        silhouettes curated from global avant-garde ateliers.
                    </p>
                    <div className="flex gap-1 md:gap-3 w-full ">
                        <button
                            aria-label="Shop Now"
                            onClick={() => navigate("/products")}
                            className="bg-black w-1/3 md:w-1/3 md:px-5 cursor-pointer  h-10  text-xs lg:text-sm font-semibold text-white hover:border border-[#0C0C0C] hover:text-[#0C0C0C] hover:bg-transparent transition duration-300"
                        >
                            SHOP NOW
                        </button>
                        <button
                            aria-label="Explore Products"
                            onClick={() => navigate("/products")}
                            className="bg-transparent  flex  cursor-pointer items-center justify-center gap-3  md:px-5  h-10 text-xs lg:text-sm  border-transparent hover:underline  transition duration-300"
                        >
                            EXPLORE COLLECTION <FaArrowRightLong />
                        </button>
                    </div>
                    <div className="flex justify-between w-full border-t border-gray-300 py-6 mt-6">
                        <div>
                            <p className="text-xs">
                                <span className="font-bold">100%</span> VERIFIED
                                AUTHENTIC
                            </p>
                        </div>
                        <div>
                            <p className="text-xs">
                                <span className="font-bold">100%</span> BEST
                                QUALITY
                            </p>
                        </div>
                        <div>
                            <p className="text-xs">
                                <span className="font-bold">7-DAY</span> STUDIO
                                RETURN
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="w-full p-5 relative">
                        <img
                            src="/homeSection/heroImage.jpg"
                            alt={newProduct?.name}
                            width="500"
                            height="500"
                            loading="lazy"
                            decoding="async"
                            className="w-full  p-4"
                        />
                        <div className="bg-[#0C0C0C] text-sm lg:text-md xl:text-lg text-white top-2 right-0 mb-4 p-2 absolute flex justify-center items-center w-40 xl:w-50">
                            <div>
                                <p>NEW PRODUCT</p>
                            </div>
                        </div>
                        <div className="bg-white bottom-0 left-0 mt-6 p-2 absolute flex justify-between items-center w-70 lg:w-100 border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-400 p-1 rounded-full"></div>
                                <div className="font-ysabeau">
                                    <p
                                        onClick={() =>
                                            navigate(
                                                `/product/${newProduct._id}`,
                                            )
                                        }
                                        className="text-sm xl:text-lg font-semibold cursor-pointer"
                                    >
                                        {newProduct?.name}
                                    </p>
                                    <p className="text-xs font-light text-gray-600">
                                        {newProduct?.brand} /{" "}
                                        {newProduct?.category}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold text-sm xl:text-lg">
                                ${newProduct?.price?.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
