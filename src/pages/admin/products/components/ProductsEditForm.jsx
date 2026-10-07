import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateProduct } from "@/features/admin/products/services/adminProductService";

const ProductsEditForm = ({ product, onClose, onSucces }) => {
  const [form, setForm] = useState({
    name: product.name,
    brand: product.brand,
    price: product.price,
    category: product.category,
    description: product.description,
    sizes: product.sizes.join(","),
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(product.image);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("sizes", form.sizes);
    if (image) {
      formData.append("image", image);
    }

    try {
      await updateProduct(product._id, formData);
      toast.success("Product updated!");
      onSucces();
    } catch (err) {
      toast.error("Update failed!");
      console.error("Update failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-3/5 space-y-3">
        <h2 className="text-xl font-bold">Edit Produk</h2>
        <form
          className="grid grid-cols-2 place-items-center space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="space-y-3">
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-80 h-80 object-cover rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-80 p-2 border rounded"
            />
          </div>

          <div className="space-y-3">
            <input
              name="name"
              value={form.name}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <input
              name="brand"
              value={form.brand}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <input
              name="price"
              type="number"
              value={form.price}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <input
              name="category"
              value={form.category}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <textarea
              name="description"
              value={form.description}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            ></textarea>
            <input
              name="sizes"
              value={form.sizes}
              placeholder="39,40,41"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />

            <div className="flex justify-between gap-3">
              <button
                type="submit"
                className="w-1/2 bg-gray-500 hover:bg-gray-900 transition duration-100 font-semibold text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 bg-gray-500 hover:bg-gray-900 transition duration-100 font-semibold text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsEditForm;
