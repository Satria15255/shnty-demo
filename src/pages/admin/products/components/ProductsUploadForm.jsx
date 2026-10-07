import React, { useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "@/features/admin/products/services/adminProductService";

const ProductsUploadForm = ({ onClose, onSucces }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    sizes: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", image);

    try {
      await createProduct(formData);
      toast.success("Product uploaded!");
      onSucces();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-3/5 space-y-3">
        <h2 className="text-xl font-bold">Add Product</h2>
        <form
          className=" grid grid-cols-2 place-items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center space-y-3">
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
              placeholder="Product Name"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              name="brand"
              placeholder="Brand"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              name="category"
              placeholder="Category"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            ></textarea>
            <input
              name="sizes"
              placeholder="Sizes (exm: 39,40,41)"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <div className="flex justify-between gap-3">
              <button
                type="submit"
                className="w-1/2 bg-gray-500 hover:bg-gray-900 transition duration-100 font-semibold text-white px-4 py-2 rounded"
              >
                Upload
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

export default ProductsUploadForm;
