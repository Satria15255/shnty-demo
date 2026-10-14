import { useEffect, useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { getLatestProducts } from "@/features/products/services/productService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await getLatestProducts();
            console.log(res.data);
            setProducts(res.data.slice(0, 8));
        } catch (err) {
            console.err("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section className="pt-12 md:mt-3 mb-8 h-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
                whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
                transition={{ duration: 1.0 }} // Animasi selama 0.6 detik
                viewport={{ once: true }}
            >
                <header className="text-center  py-2">
                    <p className="text-lg lg:text-3xl font-semibold">
                        New Arrivals
                    </p>
                    <p className="text-sm lg:text-lg text-gray-500 max-w-xs md:max-w-lg">
                        Discover the latest pieces, curated for your everyday
                        style.
                    </p>
                </header>
            </motion.div>
            <LazyMotion features={domAnimation}>
                <div
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-4
                        gap-2
                        md:mt-2
                        lg:mt-4
                        
                        w-full
                        p-2
                    "
                >
                    {loading
                        ? Array.from({ length: 8 }).map((_, index) => (
                              <div
                                  key={index}
                                  className="h-[320px] md:h-[400px] bg-gray-100 rounded-xl"
                              />
                          ))
                        : products.map((product) => (
                              <ProductCard
                                  key={product._id}
                                  product={product}
                                  productDetails={() =>
                                      navigate(`/product/${product._id}`)
                                  }
                              />
                          ))}
                </div>
            </LazyMotion>
            <footer className="text-center py-4">
                <button
                    onClick={() => navigate("/products")}
                    className="text-sm lg:text-lg px-2 text-gray-700 font-ysabeau py-1 border-b  border-gray-700  hover:border-black  hover:bg-white hover:text-black  transition duration-300"
                >
                    View All
                </button>
            </footer>
        </section>
    );
}

export default ProductList;
