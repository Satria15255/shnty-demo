import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import {
    getAllProducts,
    getLatestProducts,
    getDiscountProducts,
} from "@/features/products/services/productService";
import bgProductPages from "@/assets/hero3.png";
import { MdFilterList } from "react-icons/md";
import FilterMobile from "@/features/products/components/FilterMobile";
import FilterSidebar from "@/features/products/components/FilterSidebar";
import Loader from "@/components/common/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { TbMoodSadSquint, TbAdjustmentsHorizontal } from "react-icons/tb";
import { createFilterParams } from "@/constants/filterOption";

function ProductPages({ onAddToCart, onOpenModal }) {
    const [products, setProducts] = useState([]);
    const [currentPages, setCurrentPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.toString();

    const productsPerPage = 12;

    // Fetch products berdasarkan applied filters di URL
    useEffect(() => {
        let active = true;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getAllProducts(queryString);

                if (active) {
                    setProducts(response.data);
                }
            } catch (err) {
                console.error("Failed fetching products:", err);

                if (active) {
                    setProducts([]);
                    setError("Failed to load products.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        // Mencegah response request lama menimpa data terbaru
        return () => {
            active = false;
        };
    }, [queryString]);

    // Reset pagination ketika filter/search berubah
    useEffect(() => {
        setCurrentPages(1);
    }, [queryString]);

    // Dipakai oleh sidebar maupun mobile filter
    const handleApplyFilter = (newFilters) => {
        const params = createFilterParams(searchParams, newFilters);

        setSearchParams(params);
        setCurrentPages(1);
        setFilterOpen(false);
    };

    // Backend sudah menjalankan filtering
    const filteredProducts = products;

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / productsPerPage),
    );

    const indexOfLast = currentPages * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;

    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p role="alert" className="text-neutral-600">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <main className="pt-16 flex flex-col items-center">
            {/* Product Section */}
            <div className="mt-12 flex justify-start w-full xl:max-w-7xl py-7">
                <p className="text-sm "> Home / Products</p>
            </div>
            <section className="flex justify-center w-full xl:max-w-7xl ">
                <div className="flex flex-col justify-center md:flex-row  w-full   px-2">
                    <aside className="lg:w-1/5">
                        {/* Sidebar Filter Left*/}
                        <FilterSidebar
                            searchParams={searchParams}
                            onApply={handleApplyFilter}
                        />
                    </aside>
                    <div className="flex flex-col w-full">
                        {/* Filter Mobile Version */}
                        <section className=" w-full flex items-center justify-between lg:justify-end gap-3 mb-2 mt-2 mr-2">
                            <p className="text-md">
                                {filteredProducts?.length}{" "}
                                <span className="text-gray-500 text-sm font-semibold">
                                    Products{" "}
                                </span>
                            </p>
                            <button
                                onClick={() => setFilterOpen(true)}
                                className="flex lg:hidden py-1 px-3 gap-1 text-sm  border border-gray-300 rounded-xl "
                            >
                                <span className="flex items-center">
                                    <TbAdjustmentsHorizontal />
                                </span>
                                Filter
                            </button>
                        </section>

                        {/* Products Section */}
                        <section className="flex flex-col justify-between w-full  min-h-[100vh]">
                            <LazyMotion features={domAnimation}>
                                {currentProducts.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {currentProducts.map((product) => (
                                            <div key={product.id}>
                                                <ProductCard
                                                    product={product}
                                                    productDetails={() =>
                                                        navigate(
                                                            `/product/${product._id}`,
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col min-h-screen items-center justify-center gap-4 font-ysabeau">
                                        <div className="text-gray-700 text-8xl">
                                            <TbMoodSadSquint />
                                        </div>
                                        <p className="text-center  max-w-3/5 text-xl lg:text-3xl lg:max-w-2/5 text-gray-600">
                                            Oops, sorry—it looks like the
                                            product you're looking for isn't
                                            available...
                                        </p>
                                        <button
                                            onClick={() =>
                                                navigate("/products")
                                            }
                                            className="px-4 py-2 border border-gray-200 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] transition duration-200 font-semibold rounded-lg"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                )}
                            </LazyMotion>
                            <nav
                                aria-label="Product Pagination"
                                className="flex justify-between w-full py-4"
                            >
                                <button
                                    className="font-semibold text-xs md:text-lg w-25 rounded h-[5vh] hover:shadow-md transition duration-200"
                                    onClick={() =>
                                        setCurrentPages((prev) =>
                                            Math.max(prev - 1, 1),
                                        )
                                    }
                                    disabled={currentPages === 1}
                                >
                                    ← Previous
                                </button>
                                <div>
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                setCurrentPages(idx + 1)
                                            }
                                            className={`px-2 md:px-3 py-1 text-xs md:text-lg rounded hover:bg-gray-100 hover:font-bold transition-all duration-300 ease-in-out ${currentPages === idx + 1 ? "font-bold bg-gray-100" : ""}`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="font-semibold text-xs md:text-lg w-25 rounded h-[5vh] hover:shadow-md transition duration-200"
                                    onClick={() =>
                                        setCurrentPages((prev) =>
                                            Math.min(prev + 1, totalPages),
                                        )
                                    }
                                    disabled={currentPages === totalPages}
                                >
                                    Next →
                                </button>
                            </nav>
                        </section>
                    </div>
                </div>
                {filterOpen && (
                    <FilterMobile
                        searchParams={searchParams}
                        onApplu={handleApplyFilter}
                        onClose={() => setFilterOpen(false)}
                    />
                )}
            </section>
        </main>
    );
}

export default ProductPages;
