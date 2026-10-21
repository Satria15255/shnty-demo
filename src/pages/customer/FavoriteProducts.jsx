import ProductCard from "@/features/products/components/ProductCard";
import { useFavorite } from "@/context/FavoriteContext";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getLatestProducts,
    getAllProducts,
} from "@/features/products/services/productService";
import { LazyMotion, domAnimation } from "framer-motion";

const FavoritesPage = () => {
    const [products, setProducts] = useState([]);
    const { favorites, loadingFavorites } = useFavorite();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        console.log("Sebelum function");
        try {
            console.log("Sebelum Fetch");

            const res = await getAllProducts();
            console.log("Sesuadh fetch");

            console.log(res.data);
            setProducts(res.data.slice(0, 4));
        } catch (error) {
            console.log("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const shuffled = products.sort(() => 0.5 - Math.random());
    const recomennded = shuffled.slice(0, 6);

    console.log(recomennded);

    console.log(favorites);

    if (loadingFavorites) {
        return <p>Loading...</p>;
    }

    return (
        <main className="h-auto min-h-screen flex flex-col items-center pt-4 mt-16 pt-16">
            <div className="w-full xl:max-w-7xl px-2">
                <header className="flex justify-start w-full border-b border-gray-300 h-8 lg:h-12">
                    <p className="text-sm lg:text-2xl font-semibold mb-2 md:mb-6">
                        Liked Products
                    </p>
                </header>

                <section className="min-h-screen">
                    {favorites.length < 1 ? (
                        <div className="flex flex-col min-h-120 items-center justify-center gap-4 font-ysabeau mt-12">
                            <div className="text-gray-700 text-8xl">
                                <RiEmotionUnhappyLine />
                            </div>
                            <p className="text-center  max-w-3/5 text-xl lg:text-3xl lg:max-w-2/5 text-gray-600">
                                Oops, sorry—it looks like you don't have any
                                favorite products yet....
                            </p>
                            <button
                                onClick={() => navigate("/products")}
                                className="px-4 py-2 border border-gray-200 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] transition duration-200 font-semibold rounded-lg"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <LazyMotion features={domAnimation}>
                                {favorites.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        productDetails={() =>
                                            navigate(`/product/${product._id}`)
                                        }
                                    />
                                ))}
                            </LazyMotion>
                        </section>
                    )}
                </section>

                <aside className="mt-8 max-w-7xl">
                    <h2 className="text-sm text-center lg:text-xl font-bold mb-4">
                        You Might Like
                    </h2>
                    <div className="grid grid-cols-2 place-items-center md:grid-cols-4 gap-3">
                        <LazyMotion features={domAnimation}>
                            {recomennded.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </LazyMotion>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default FavoritesPage;
