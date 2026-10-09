import { m } from "framer-motion";
import { FaCartPlus, FaStar } from "react-icons/fa";
import {
    IoBagHandleOutline,
    IoHeartOutline,
    IoSearchOutline,
} from "react-icons/io5";
import { useProductModal } from "@/context/ProductModalContext";
import { useFavorite } from "@/context/FavoriteContext";
import { optimizeCloudinaryImage } from "@/helper/optimizeCloudinaryImage";
import { useNavigate } from "react-router-dom";
import ProductCardSkeletton from "./ProductCardSkeletton";

function ProductCard({ product, productDetails, openModal, productModal }) {
    const { discountPercent, discountPrice } = product;
    const { openProductModal } = useProductModal();
    const { isFavorite, toggleFavorite } = useFavorite();
    const navigate = useNavigate();

    const favorite = isFavorite(product._id);

    const isDiscount = discountPercent && discountPrice;

    return (
        <m.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            key={product.id}
            className=" flex flex-col justify-center  w-full h-auto md:rounded-5 lg:rounded-xl mt-2  rounded-xl"
        >
            {product ? (
                <div>
                    <div className="w-full h-auto relative ">
                        <img
                            src={optimizeCloudinaryImage(product.image, 500)}
                            alt={product.name}
                            srcSet={`
                     ${optimizeCloudinaryImage(product.image, 300)} 300w,
                        ${optimizeCloudinaryImage(product.image, 500)} 500w,
                        ${optimizeCloudinaryImage(product.image, 700)} 700w
                    `}
                            sizes="
                    (max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                    25vw
                    "
                            width="500"
                            height="500"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto object-cover    object-center"
                        />
                        <div>
                            {product.isBestSeller === true && (
                                <div>
                                    <p className="absolute top-2 left-2 bg-[#0C0C0C] text-white text-xs xl:text-sm font-ysabeau px-2 xl:px-4 xl:py-2 py-1 rounded-xl">
                                        Best Seller
                                    </p>
                                </div>
                            )}
                            <div className="absolute inset-0 flex justify-center items-end translate-y-1 opacity-0 hover:translate-y-0 hover:opacity-100 transition duration-200 ">
                                <div className="mb-3 flex gap-3  ">
                                    <button
                                        aria-label="Add product to favorite list"
                                        onClick={() =>
                                            toggleFavorite(product._id)
                                        }
                                        className={`p-2 rounded-full  text-lg lg:text-xl shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200 ${favorite ? "bg-black text-white" : " text-[#0C0C0C]"}`}
                                    >
                                        <IoHeartOutline />
                                    </button>
                                    <button
                                        aria-label="See Product Detail"
                                        onClick={() => productDetails(product)}
                                        className="p-2 rounded-full  text-lg lg:text-xl shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200  text-[#0C0C0C]"
                                    >
                                        <IoSearchOutline />
                                    </button>
                                    <button
                                        aria-label="Open product modal"
                                        onClick={() =>
                                            openProductModal(product)
                                        }
                                        className="p-2 rounded-full  text-lg lg:text-xl shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200  text-[#0C0C0C]"
                                    >
                                        <IoBagHandleOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 p-2 flex flex-col  space-y-2 md:space-y-2 lg:justify-center">
                        <div className="h-7">
                            <p className="text-sm  md:text-[15px] lg:text-sm  font-ysabeau ">
                                {" "}
                                {product.name}
                            </p>
                        </div>

                        <div className="flex justify-between  items-center ">
                            <div className="flex  items-center justify-center font-montserrat">
                                {isDiscount ? (
                                    <div className="flex flex-col xl:flex-row gap-1 items-start">
                                        <p className=" text-sm lg:text-lg xl:text-sm line-through">
                                            ${product.price.toFixed(2)}
                                        </p>
                                        <p className="text-sm lg:text-lg xl:text-sm text-yellow-600 font-bold">
                                            ${discountPrice.toFixed(2)}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-sm lg:text-lg xl:text-sm text-yellow-600 font-bold">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <ProductCardSkeletton />
            )}
        </m.article>
    );
}

export default ProductCard;
