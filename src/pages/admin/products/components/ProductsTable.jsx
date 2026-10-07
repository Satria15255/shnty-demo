import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductsTable = ({
  products,
  onEdit,
  onDelete,
  search,
  onChange,
  brand,
  category,
  setFilter,
}) => {
  return (
    <div className="w-full border-collapse border border-gray-200 rounded-lg">
      <div className="p-4 flex items-center gap-4 rounded-t-lg">
        <div className="w-3/5">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={onChange}
            className="w-full px-2 py-2 text-xs lg:text-sm bg-white border border-gray-300 rounded-xl"
          />
        </div>
        <div className="flex w-2/5 gap-4">
          <select
            name=""
            id=""
            className="bg-white py-2 px-2 rounded-xl border border-gray-300 w-1/2 text-sm"
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                brand: e.target.value,
              }))
            }
          >
            {brand.map((b) => (
              <option value={b} key={b}>
                {b}
              </option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="bg-white py-2 px-2 rounded-xl border border-gray-300 w-1/2 text-sm"
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          >
            {category.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 w-full text-xs">
          <tr>
            <th className="p-2 w-1/3 text-left">Name</th>
            <th className="text-left">Brand</th>
            <th className="text-left">Price</th>
            <th className="text-left">Category</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto w-full">
        <table className="w-full table-fixed">
          <tbody className="w-full">
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-200 w-full table-fixed text-xs"
              >
                <td className="p-2  w-1/3">
                  <div className="flex">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover mr-2 inline-block rounded-md"
                    />
                    <p className="p-2 flex flex-col">
                      {p.name}
                      <span className="text-xs text-gray-400">#{p._id}</span>
                    </p>
                  </div>
                </td>

                <td className="p-2">{p.brand}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.category}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-gray-900 border border-gray-400 hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg p-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="text-gray-900 border border-gray-400 hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg p-4"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
