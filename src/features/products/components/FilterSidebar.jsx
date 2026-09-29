import React from "react";
import { MdAutoAwesome, MdOutlineExpandMore, MdSell } from "react-icons/md";

const FilterSidebar = ({ categories, size, filter, setFilter }) => {
  const handleSizeChange = (selectedSize) => {
    setFilter((prev) => {
      const isSelected = prev.size.includes(selectedSize);

      return {
        ...prev,
        size: isSelected
          ? prev.size.filter((item) => item !== selectedSize)
          : [...prev.size, selectedSize],
      };
    });
  };

  return (
    <div>
      <div className="lg:flex hidden flex-col md:w-full space-y-2 pr-3">
        <div className="">
          <p className="flex  md:text-sm lg:text-lg items-center justify-between rounded-xl w-full text-left py-2 text-lg rounded-md text-left font-semibold">
            Category
          </p>
          <div className="py-2 flex md:flex-col pl-4 text-left space-y-2 ">
            {categories.map((cat) => (
              <button
                key={cat}
                value={cat}
                onClick={() =>
                  setFilter((prev) => ({ ...prev, category: cat }))
                }
                className={`flex items-center justify-start py-2 text-[9px] md:text-sm lg:text-lg text-left text-gray-500 font-semibold px-2 cursor-pointer rounded-xl transition-all transition-discrete duration-300 ease-in-out
                ${filter.category === cat ? "text-yellow-500 bg-gray-100 shadow-md" : "hover:text-yellow-500"}`}
              >
                - {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="">
          <p className="flex items-center justify-between md:text-sm lg:text-lg rounded-xl w-full text-left py-2 flex justify-between items-center text-left font-semibold w-full ">
            Size{" "}
          </p>

          <div className="space-y-3">
            {size.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filter.size.includes(item)}
                  onChange={() => handleSizeChange(item)}
                  className="w-4 h-4 accent-black cursor-pointer"
                />

                <span className="text-sm text-gray-600 group-hover:text-black transition">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="flex items-center justify-between md:text-sm lg:text-lg rounded-xl w-full text-left py-2 flex justify-between items-center text-left font-semibold w-full ">
            Other
          </p>
          <div className="pl-4 py-2">
            <button
              className={`flex items-center gap-1 md:text-sm lg:text-lg font-semibold  rounded-xl w-full text-left py-2  hover:shadow-lg hover:pl-1 transition-all duration-300 ease-in-out
              ${filter.latest ? "text-[#0C0C0C]  shadow-md pl-1" : "hover:text-yellow-500 text-gray-500"}`}
              onClick={() =>
                setFilter((prev) => ({ ...prev, latest: !prev.latest }))
              }
            >
              <span>
                <MdAutoAwesome />
              </span>
              New Arrival
            </button>
            <button
              className={`flex items-center gap-1 md:text-sm lg:text-lg font-semibold rounded-xl w-full text-left py-2  hover:shadow-lg hover:pl-1 transition-all duration-300 ease-in-out
              ${filter.discount ? "text-[#0C0C0C]  shadow-md pl-1" : "hover:text-yellow-500 text-gray-500"}`}
              onClick={() =>
                setFilter((prev) => ({ ...prev, discount: !prev.discount }))
              }
            >
              <span>
                <MdSell />
              </span>
              Discount Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
