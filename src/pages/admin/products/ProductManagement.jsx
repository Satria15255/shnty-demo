import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductsTable from "@/pages/admin/products/components/ProductsTable";
import ProductsUploadForm from "@/pages/admin/products/components/ProductsUploadForm";
import ProductsEditForm from "@/pages/admin/products/components/ProductsEditForm";
import { deleteProduct } from "@/pages/admin/products/services/adminProductService";
import { getAllProducts } from "@/pages/products/services/productService";
import { getProductsSummary } from "@/pages/admin/dashboard/services/adminDashboardService";
import DashboardStatsCard from "@/components/admin/ui/DashboardStatsCard";
import { productsManagementConfig } from "@/pages/admin/products/config/ProductsManagementConfig";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [summary, setSummary] = useState([]);
  const [range, setRange] = useState("7d");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    brand: "All Brand",
    category: "All Category",
    search: "",
  });
  const brands = [
    "All Brand",
    "Nike",
    "Mizuno",
    "Adidas",
    "Converse",
    "Vans",
    "New Balance",
    "Asics",
    "Reebok",
    "Onitsu Tiger",
    "Puma",
  ];
  const category = [
    "All Category",
    "Running",
    "Casual",
    "Basketball",
    "Sneakers",
  ];
  const productPerPage = 6;

  const fetchSummary = async () => {
    try {
      const res = await getProductsSummary(range);
      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [range]);

  const fetchProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure want to delete this product?")) return;
      await deleteProduct(id);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      toast.error("Failed delete product");
    }
  };

  const handleUploadSuccess = () => {
    setIsUploadOpen(false);
    fetchProducts();
  };

  const handleEditSucces = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const filterProducts = () => {
    return products.filter((product) => {
      const matchBrand =
        filter.brand === "All Brand" || product.brand === filter.brand;
      const matchCategory =
        filter.category === "All Category" ||
        product.category === filter.category;
      const matchSearch =
        filter.search.trim() === "" ||
        product.name.toLowerCase().includes(filter.search.toLowerCase());
      return matchBrand && matchCategory && matchSearch;
    });
  };

  const filteredProducts = filterProducts();

  // Product Pagination
  const totalPages = Math.ceil(filteredProducts.length / productPerPage);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter.brand, filter.category, filter.search]);

  const getPagination = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    // halaman 1-3
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, totalPages];
    }

    // halaman terakhir
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // halaman tengah
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <main className="w-full h-screen flex flex-col gap-4 px-4 py-5">
      <header className="flex justify-between items-center mb-2">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold font-sans">Product Management</p>
          <p className="text-sm text-gray-700">
            Manage and organize our products easily
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className=" border border-black bg-black text-sm text-white hover:bg-white transition duration-100 hover:text-black py-2 px-5 rounded-lg flex items-center justify-center"
        >
          + Add New Product
        </button>
      </header>

      <section className="flex justify-around gap-4 ">
        {productsManagementConfig.map((item) => (
          <DashboardStatsCard
            key={item.key}
            title={item.title}
            data={summary[item.key]}
            icon={item.icon}
          />
        ))}
      </section>

      <section>
        <ProductsTable
          products={currentProducts}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={handleDelete}
          search={filter.search}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
          category={category}
          brand={brands}
          setFilter={setFilter}
        />
        <nav className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">
            Showing {indexOfFirstProduct + 1} -{" "}
            {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === 1
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              ←
            </button>

            <div className="flex gap-2">
              {getPagination().map((item, index) =>
                item === "..." ? (
                  <span
                    key={index}
                    className="w-10 h-10 flex items-center justify-center text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(item)}
                    className={`w-10 h-10 rounded-lg border border-gray-200 transition
        ${currentPage === item ? "bg-black text-white" : "hover:bg-gray-100"}`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === totalPages
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              →
            </button>
          </div>
        </nav>
      </section>

      {isUploadOpen && (
        <ProductsUploadForm
          onClose={() => setIsUploadOpen(false)}
          onSucces={handleUploadSuccess}
        />
      )}

      {editingProduct && (
        <ProductsEditForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSucces={handleEditSucces}
        />
      )}
    </main>
  );
};

export default ProductManagement;
