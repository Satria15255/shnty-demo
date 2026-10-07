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

function ProductPages({ onAddToCart, onOpenModal }) {
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [currentPages, setCurrentPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState({
        category: [],
        size: [],
        latest: false,
        discount: false,
    });
    const productsPerPage = 12;
    const category = ["Basketball", "Sneakers", "Running", "Casual"];
    const size = [38, 39, 40, 41, 42, 43, 44];
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const normalizeDiscount = (discount) => {
        return {
            ...discount.productId,
            price: Number(discount.productId.price),
            isDiscount: true,
            discountPercent: Number(discount.discountPercent),
            discountPrice: Number(discount.discountPrice),
            expiresAt: discount.expiresAt,
        };
    };

    const fetchProductsData = useCallback(async () => {
        try {
            setLoading(true);

            const [allProductsRes, latestProductsRes, discountProductsRes] =
                await Promise.all([
                    getAllProducts(),
                    getLatestProducts(),
                    getDiscountProducts(),
                ]);

            // All Products
            setProducts(allProductsRes.data);

            // Latest Products
            setLatestProducts(latestProductsRes.data);

            // Normalize Discount Products
            const normalizedDiscounts =
                discountProductsRes.data.map(normalizeDiscount);

            setDiscountProducts(normalizedDiscounts);

            // Merge Discount Into Products
            setProducts((prev) =>
                prev.map((p) => {
                    const found = normalizedDiscounts.find(
                        (d) => d._id === p._id,
                    );

                    return found ? found : p;
                }),
            );
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    const filterProducts = () => {
        const source = filter.discount
            ? discountProducts
            : filter.latest
              ? latestProducts
              : products || [];
        return source.filter((product) => {
            const matchCategory =
                filter.category.length === 0 ||
                filter.category.includes(product.category);
            const matchSize =
                filter.size.length === 0 ||
                (Array.isArray(product.sizes) &&
                    filter.size.some((selectedSize) =>
                        product.sizes.includes(Number(selectedSize)),
                    ));
            const matchSearch =
                searchQuery.trim() === "" ||
                product.name
                    .toLowerCase()
                    .includes(searchQuery.toLocaleLowerCase());
            return matchCategory && matchSize && matchSearch;
        });
    };
    const filteredProducts = filterProducts();

    const handleProductSearch = (value) => {
        setFilter((prev) => ({
            ...prev,
            search: value,
        }));

        const params = new URLSearchParams(searchParams);

        if (value.trim()) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        setSearchParams(params, {
            replace: true,
        });
    };

    useEffect(() => {
        const search = searchParams.get("search") || "";

        setFilter((prev) => {
            if (prev.search === search) {
                return prev;
            }

            return {
                ...prev,
                search,
            };
        });
    }, [searchParams]);

    // Function Products Pagination
    useEffect(() => {
        setCurrentPages(1);
    }, [
        filter.category,
        filter.size,
        filter.latest,
        filter.discount,
        searchQuery,
    ]);
    const indexOfLast = currentPages * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (loading) {
        return <Loader />;
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
                            category={category}
                            size={size}
                            filter={filter}
                            setFilter={setFilter}
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
                        open={filterOpen}
                        onClose={() => setFilterOpen(false)}
                        categories={categories}
                        sizes={size}
                        currentFilter={filter}
                        onApply={(newFilter) => setFilter(newFilter)}
                    />
                )}
            </section>
        </main>
    );
}

export default ProductPages;
