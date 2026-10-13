import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCartPlus, FaStar } from "react-icons/fa";
import {
    getProductById,
    getAllProducts,
} from "@/features/products/services/productService";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useFavorite } from "@/context/FavoriteContext";
import { IoHeartOutline } from "react-icons/io5";
import { LazyMotion, domAnimation } from "framer-motion";

import Loader from "@/components/common/Loader";
import ProductCard from "@/features/products/components/ProductCard";
import CallAction from "@/pages/public/home/sections/Discount";

function ProductModal() {
    const [product, setProduct] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [loading, setLoading] = useState(true);
    const { handleAddToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [size, setSize] = useState([]);
    const { isFavorite, toggleFavorite } = useFavorite();
    const favorite = isFavorite(product._id);

    // FETCH PRODUCTS DETAILS
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await getProductById(id);
            setProduct(res.data);
            console.log(res.data);

            const { data: products } = await getAllProducts();
            const shuffled = products.sort(() => 0.5 - Math.random());
            setRecommended(shuffled.slice(0, 4));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // PRODUCT STOCK INFORMATION
    const productSize = product?.variants?.map((stock) => stock.size);
    console.log(productSize);

    const currentVariant = product?.variants?.find(
        (v) => v.size === selectedSize,
    );
    console.log(currentVariant);

    // DISCOUNT VALIDATION
    const isDiscount = product.discountPercent > 0;

    // HANDLE CHECKOUT
    const handleChekoutNow = () => {
        try {
            if (!user) {
                navigate("/login");
                return;
            }
            if (!selectedSize) {
                toast.warning("Please select a size before adding to cart.");
                return;
            }
        } catch (error) {
            console.log(error);
        }

        const finalPrice =
            product.discountPercent > 0
                ? product.price -
                  (product.price * product.discountPercent) / 100
                : product.price;

        const selectedItem = {
            id: product._id,
            name: product.name,
            image: product.image,
            size: selectedSize,
            quantity: 1,
            finalPrice,
            discountPercent: product.discountPercent,
        };

        navigate("/checkout", { state: { checkoutItems: [selectedItem] } });
    };

    if (loading) {
        return <Loader />;
    }
    console.log(recommended);

    return (
        <main className="w-full flex justify-center">
            <div className="md:mt-16 pt-12 bg-white rounded-lg w-full  flex-col items-center  xl:max-w-7xl px-4">
                <article className="relative flex flex-col md:flex-row justify-center  ">
                    <div className="w-full h-full flex justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full  h-full object-cover flex justify-center items-center rounded-md mt-2"
                        />
                    </div>

                    <div className="w-full gap-3 flex justify-around flex-col md:pl-6 mt-3">
                        <header className="flex flex-col gap-3">
                            <p className="text-sm md:text-lg text-gray-500">
                                {product.brand} / {product.category}
                            </p>
                            <p className="text-3xl lg:text-5xl font-semibold">
                                {product.name}
                            </p>
                        </header>

                        <div className="flex items-center ">
                            {isDiscount ? (
                                <div className="flex gap-2">
                                    <p className="text-lg lg:text-3xl font-bold line-through">
                                        USD {product.price}.00
                                    </p>
                                    <p className="text-lg lg:text-3xl  font-bold">
                                        USD {product.discountPrice.toFixed(2)}
                                    </p>
                                </div>
                            ) : (
                                <div className="">
                                    <p className="text-lg lg:text-3xl font-bold">
                                        USD {product.price}.00
                                    </p>
                                </div>
                            )}
                        </div>

                        <section className="">
                            <p className="text-lg lg:text-2xl font-semibold">
                                Size Charts
                            </p>
                            <div className="mt-3 lg:mt-6 flex flex-col gap-5">
                                <div className="flex flex-wrap gap-3">
                                    {productSize.length > 0 ? (
                                        productSize.map((size) => (
                                            <button
                                                aria-label="Product Size Option"
                                                key={size}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedSize(size)
                                                }
                                                className={`px-4 py-2 border rounded-md transition 
                    ${
                        selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white hover:bg-gray-100"
                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm mt-5">
                                            Size not available
                                        </p>
                                    )}
                                </div>

                                {!selectedSize ? (
                                    <p className="text-red-500 text-sm mt-5">
                                        Please select a size
                                    </p>
                                ) : (
                                    <div>
                                        {currentVariant?.stock <= 3 ? (
                                            <p className="text-red-500 text-sm mt-5">
                                                <span>
                                                    {currentVariant?.stock}
                                                </span>{" "}
                                                Stock Left
                                            </p>
                                        ) : (
                                            <p className="mt-5 text-gray-500 text-sm font-semibold">
                                                <span>
                                                    {currentVariant?.stock}
                                                </span>{" "}
                                                Stock Left
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>

                        <div className=" flex gap-4 justify- items-center ">
                            <button
                                aria-label="Add product to favorite list"
                                onClick={() => toggleFavorite(product._id)}
                                className={`p-3 rounded-full border border-gray-200 text-lg lg:text-xl shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200 ${favorite ? "bg-black text-white" : "bg-white text-[#0C0C0C]"}`}
                            >
                                <IoHeartOutline />
                            </button>
                            <button
                                aria-label="Add Product to Cart"
                                onClick={() =>
                                    handleAddToCart(product, selectedSize)
                                }
                                className=" flex gap-2 items-center justify-center w-full px-2 py-3 border bg-black text-white hover:text-black rounded-md hover:bg-white transition"
                            >
                                Add to Cart <FaCartPlus />
                            </button>
                            <button
                                aria-label="Buy product instan"
                                onClick={() => {
                                    handleChekoutNow();
                                }}
                                className=" w-full px-2 py-3 bg-white border  hover:text-white rounded-md hover:bg-black transition"
                            >
                                Chekout
                            </button>
                        </div>
                    </div>
                </article>

                <section className="mt-9 flex flex-col gap-4">
                    <div>
                        <p className="text-xl lg:text-2xl font-semibold">
                            Product Description
                        </p>
                        <p className="py-3 text-sm lg:text-lg text-gray-600 pl-4 border-bottom w-full ">
                            {product.description}
                        </p>
                    </div>
                    <div>
                        <p className="text-xl lg:text-2xl font-semibold">
                            Specification
                        </p>
                        <div className="grid grid-cols-2 pl-4">
                            <p className="py-3 text-gray-600 text-sm lg:text-lg border-bottom w-full ">
                                Type :{" "}
                                <span className="text-black">
                                    {product.type}
                                </span>
                            </p>

                            <p className="py-3 text-sm text-gray-600 lg:text-lg border-bottom w-full ">
                                Color :{" "}
                                <span className="text-black">
                                    {product.color}
                                </span>
                            </p>

                            <p className="py-3 text-sm lg:text-lg text-gray-600 border-bottom w-full ">
                                Material :{" "}
                                <span className="text-black">
                                    {product.material}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    className="mt-8 w-full 
                        xl:max-w-7xl"
                >
                    <p className="text-xl lg:text-2xl font-semibold pb-4">
                        Might You Like:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:mt-2 lg:mt-4 w-full p-2 ">
                        <LazyMotion features={domAnimation}>
                            {recommended.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    productDetails={() =>
                                        navigate(`/product/${product._id}`)
                                    }
                                    product={product}
                                />
                            ))}
                        </LazyMotion>
                    </div>
                </section>

                <div className="py-4">
                    <CallAction />
                </div>
            </div>
        </main>
    );
}

export default ProductModal;
