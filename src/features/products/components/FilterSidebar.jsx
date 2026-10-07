import React from "react";
import { MdAutoAwesome, MdOutlineExpandMore, MdSell } from "react-icons/md";

const FilterSidebar = ({ category, size, filter, setFilter }) => {
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

  const handleCatChange = (selectedCat) => {
    setFilter((prev) => {
      const isSelected = prev.category.includes(selectedCat);

      return {
        ...prev,
        category: isSelected
          ? prev.category.filter((item) => item !== selectedCat)
          : [...prev.category, selectedCat],
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
            {category.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filter.category.includes(item)}
                  onChange={() => handleCatChange(item)}
                  className="w-4 h-4 accent-black cursor-pointer"
                />

                <span className="text-sm text-gray-600 group-hover:text-black transition">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="">
          <p className="flex items-center justify-between md:text-sm lg:text-lg rounded-xl w-full text-left py-2 flex justify-between items-center text-left font-semibold w-full ">
            Size{" "}
          </p>

          <div className="py-2 flex md:flex-col pl-4 text-left space-y-2">
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
