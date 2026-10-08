import React, { useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "@/pages/admin/products/services/adminProductService";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProductsUploadForm = ({ onClose, onSucces }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    type: "",
    material: "",
    color: "",
    description: "",
  });

  const [variants, setVariants] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const standardSizes = ["XS", "S", "M", "L", "XL", "XXL", "ONE SIZE"];

  const normalizeSize = (size) => size.trim().toUpperCase();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSize = (size = "") => {
    const newVariant = {
      // ID for react
      id: crypto.randomUUID(),
      size,
      stock: "",
    };

    setVariants((prev) => {
      const alreadyExists =
        size &&
        prev.some(
          (variant) => normalizeSize(variant.size) === normalizeSize(size),
        );

      return alreadyExists ? prev : [...prev, newVariant];
    });
  };

  const handleVariantChange = (id, field, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const handleRemoveSize = (id) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  const totalStock = variants.reduce((total, variant) => {
    const stock = Number(variant.stock);

    return total + (Number.isInteger(stock) && stock >= 0 ? stock : 0);
  }, 0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (variants.length === 0) {
      toast.error("Tambahkan minimal satu size.");
      return;
    }

    const invalidVariant = variants.some((variant) => {
      const stock = Number(variant.stock);

      return (
        !variant.size.trim() ||
        variant.stock.trim() === "" ||
        !Number.isInteger(stock) ||
        stock < 0
      );
    });

    if (invalidVariant) {
      toast.error("Isi setiap size dan stock dengan bilangan bulat minimal 0.");
      return;
    }

    const normalizedSizes = variants.map((variant) =>
      normalizeSize(variant.size),
    );

    if (new Set(normalizedSizes).size !== normalizedSizes.length) {
      toast.error("Size tidak boleh duplikat.");
      return;
    }

    const variantPayload = variants.map((variant) => ({
      size: normalizeSize(variant.size),
      stock: Number(variant.stock),
    }));

    if (!image) {
      toast.error("Pilih gambar produk terlebih dahulu.");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("image", image);

    formData.append("variants", JSON.stringify(variantPayload));

    setSubmitting(true);

    try {
      await createProduct(formData);
    } catch (err) {
      console.error("Upload failed", err);

      toast.error(err.response?.data?.message || "Product gagal disimpan.");

      return;
    } finally {
      setSubmitting(false);
    }

    toast.success("Product dan variants berhasil disimpan!");
    navigate("/admin/product");
    onSucces?.();
  };

  return (
    <main className="bg-[#ECF0FF] p-8">
      <header className="flex flex-col space-y-1 pb-8 border-b border-gray-400">
        <p className="text-gray-500 text-sm">
          Product{" "}
          <span className="text-gray-900 font-semibold">/ New Product</span>
        </p>
        <h1 className="text-3xl font-bold">New Product</h1>
        <p className="text-gray-500 text-sm">
          Create a new garment inventory master and configure size-level unit
          allocations
        </p>
      </header>
      {/*Form Section*/}
      <form onSubmit={handleSubmit} className="w-full pt-8">
        <fieldset disabled={submitting} className="flex flex-col gap-8">
          <div className="flex w-full gap-8">
            {/*Left Section*/}
            <div className="flex flex-col w-full space-y-8">
              {/*Basic Information*/}
              <section className="p-6 bg-white rounded-xl">
                <div className="flex flex-col gap-2 pb-2 border-b border-gray-400">
                  <h1 className="text-xl font-semibold">Basic Information</h1>
                  <p className="text-xs text-gray-400">
                    Core identifiers presented on storefront listings and
                    manifest
                  </p>
                </div>
                <div className="pt-4">
                  <div className="space-y-4 text-sm">
                    <label htmlFor="">Product Name *</label>
                    <input
                      name="name"
                      placeholder="Product Name"
                      className="w-full p-2 border-none bg-[#ECF0FF] rounded-lg"
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="">Brand *</label>
                    <input
                      name="brand"
                      placeholder="Brand"
                      className="w-full p-2 border-none bg-[#ECF0FF] rounded-lg"
                      onChange={handleChange}
                    />

                    <label htmlFor="">Description *</label>
                    <textarea
                      name="description"
                      placeholder="Description"
                      className="w-full p-2 border-none min-h-30 bg-[#ECF0FF] rounded-lg"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </section>

              {/*Product Classification*/}
              <section className="p-6 bg-white rounded-xl">
                <div className="flex flex-col gap-2 pb-2 border-b border-gray-400">
                  <h1 className="text-xl font-semibold">
                    Classification & Detail
                  </h1>
                  <p className="text-xs text-gray-400">
                    Taxonomy tags and garment composition metadata
                  </p>
                </div>
                <div className="pt-4">
                  <div className=" text-sm grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="">Category *</label>
                      <input
                        name="category"
                        placeholder=" "
                        className="w-full p-2 border-none bg-[#ECF0FF] rounded-lg"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">Product Type *</label>
                      <input
                        name="type"
                        placeholder=""
                        className="w-full p-2 border-none bg-[#ECF0FF] rounded-lg"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Material Specification *</label>
                      <input
                        name="material"
                        placeholder=" "
                        className="w-full p-2 border-none bg-[#ECF0FF] rounded-lg"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Color / Shade *</label>
                      <input
                        name="color"
                        placeholder="  "
                        className="w-full p-2 border-none bg-[#ECF0FF] rounded-lg"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/*Size & Stock Classification*/}
              <section className="rounded-xl bg-white p-6">
                <div className="space-y-2 border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold">
                    Size & Stock Configuration
                  </h2>

                  <p className="text-xs text-gray-500">
                    Add sizes and set the available stock for each size.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      QUICK ADD STANDARD SIZE
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {standardSizes.map((size) => {
                        const alreadyAdded = variants.some(
                          (variant) => normalizeSize(variant.size) === size,
                        );

                        return (
                          <button
                            key={size}
                            type="button"
                            disabled={alreadyAdded}
                            onClick={() => handleAddSize(size)}
                            className="rounded-md bg-[#ECF0FF] px-3 py-2 text-xs
                         disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="hidden grid-cols-[1fr_1fr_1fr_auto] gap-3
                    text-xs text-gray-500 sm:grid"
                  >
                    <span>SIZE</span>
                    <span>AVAILABLE UNITS</span>
                    <span>STATUS</span>
                    <span>ACTION</span>
                  </div>

                  {variants.length === 0 && (
                    <p className="rounded-lg border border-dashed p-5 text-sm text-gray-500">
                      No sizes added. Choose a standard size or click Add Size.
                    </p>
                  )}

                  {variants.map((variant) => {
                    const stock = Number(variant.stock);
                    const validStock =
                      variant.stock !== "" &&
                      Number.isInteger(stock) &&
                      stock >= 0;

                    return (
                      <div
                        key={variant.id}
                        className="grid grid-cols-2 items-center gap-3
                     border-b border-gray-100 pb-4
                     sm:grid-cols-[1fr_1fr_1fr_auto]"
                      >
                        <label className="min-w-0">
                          <span className="mb-1 block text-xs sm:sr-only">
                            Size
                          </span>

                          <input
                            type="text"
                            value={variant.size}
                            onChange={(e) =>
                              handleVariantChange(
                                variant.id,
                                "size",
                                e.target.value.toUpperCase(),
                              )
                            }
                            placeholder="e.g. XL"
                            required
                            className="w-full rounded-lg bg-[#ECF0FF] p-3 text-sm"
                          />
                        </label>

                        <label className="min-w-0">
                          <span className="mb-1 block text-xs sm:sr-only">
                            Available units
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={variant.stock}
                            onChange={(e) =>
                              handleVariantChange(
                                variant.id,
                                "stock",
                                e.target.value,
                              )
                            }
                            placeholder="0"
                            required
                            className="w-full rounded-lg bg-[#ECF0FF] p-3 text-sm"
                          />
                        </label>

                        <div>
                          {validStock ? (
                            <span
                              className={`rounded px-2 py-1 text-xs ${
                                stock > 0
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Enter stock
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSize(variant.id)}
                          aria-label={`Remove size ${variant.size || "row"}`}
                          className="min-h-11 px-2 text-sm text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => handleAddSize()}
                      className="rounded-lg bg-[#ECF0FF] px-4 py-2 text-sm"
                    >
                      + Add Size
                    </button>

                    <p className="text-sm text-gray-500">
                      Total Stock:{" "}
                      <strong className="text-gray-900">
                        {totalStock} units
                      </strong>
                    </p>
                  </div>

                  <p className="text-xs text-gray-500">
                    Sizes and stock will be saved when you create the product.
                  </p>
                </div>
              </section>
            </div>

            {/*Right Section*/}
            <div className="w-2/5 flex flex-col space-y-8">
              {/*Product Image*/}
              <section className="p-6 bg-white rounded-xl">
                <div className="flex flex-col gap-2 pb-2 border-b border-gray-400">
                  <h1 className="text-xl font-semibold">Product Image</h1>
                </div>
                <div className="pt-4">
                  <div className="flex flex-col justify-center space-y-3">
                    <div>
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-80 bg-[#ECF0FF] rounded-lg"></div>
                      )}
                    </div>
                    <div className="flex flex-col bg-[#ECF0FF] rounded-lg p-3 items-center gap-1">
                      <p className="text-sm font-semibold">
                        Chose a file or Drag it Here
                      </p>
                      <p className="text-xs text-center text-gray-500">
                        JPG, PNG, or WEBP up to 5MB (1:1 ratio suggested)
                      </p>

                      <div className="space-y-2">
                        <input
                          id="product-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="peer sr-only"
                        />

                        <label
                          htmlFor="product-image"
                          className="inline-flex cursor-pointer rounded-lg
               border border-gray-100 bg-white shadow-lg px-4 py-2 text-xs gap-1 items-center
               peer-focus-visible:outline
               peer-focus-visible:outline-2
               peer-focus-visible:outline-offset-2"
                        >
                          <AiOutlineFileAdd />
                          {image ? "Change File" : "Browser File"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/*Pricing*/}
              <section className="p-6 bg-white rounded-xl">
                <div className="flex flex-col gap-2 pb-2 border-b border-gray-400">
                  <h1 className="text-xl font-semibold">Pricing</h1>
                  <p className="text-xs text-gray-400">
                    Retail pricing and taxation foundation
                  </p>
                </div>
                <div className="pt-4">
                  <div className="space-y-2 text-sm">
                    <label className="flex w-full font-semibold justify-between">
                      Base Retail Price{" "}
                      <span className="text-gray-500">USD ($)</span>
                    </label>
                    <div className="flex bg-[#ECF0FF] rounded-lg">
                      <div className="p-2 ">$</div>
                      <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        placeholder="00.00"
                        className="w-full p-2 border-none"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="py-4 border-b border-gray-200">
                  <p className="text-xs text-gray-400">
                    Base retail price excluding local VAT and shipping
                    surcharges.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500 flex justify-between">
                    Invertory Valuation{" "}
                    <span className="text-black font-semibold">$10.000.00</span>
                  </p>
                  <p className="text-xs flex text-gray-500 justify-between">
                    Estimated Margin{" "}
                    <span className="text-green-500 font-semibold">68.4%</span>
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div>
            {/*Submit*/}
            <section className="p-6 bg-white flex justify-between items-center  rounded-xl">
              <div className="flex gap-3 items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="flex flex-col">
                  <div className="flex gap-2 ">
                    <p className="text-sm font-semibold">Draft Master :</p>
                    <p className="text-sm font-semibold">{form.name}</p>
                  </div>
                  <div className="flex gap-2   text-gray-500">
                    <p className="text-sm font-semibold">
                      All variants stock chek passed:
                    </p>
                    <p className="text-sm font-semibold">
                      {variants.length} sizes assigned
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border px-5 py-3"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
                  >
                    {submitting ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default ProductsUploadForm;
