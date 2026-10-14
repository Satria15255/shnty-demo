import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { catalogMenus } from "@/constants/catalogMenu";

export default function CatalogDropdown() {
  const [openMenu, setOpenMenu] = useState(null);

  const containerRef = useRef(null);
  const location = useLocation();

  // Tutup dropdown ketika klik di luar atau tekan Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Tutup dropdown ketika URL berubah
  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname, location.search]);

  const handleToggle = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  return (
    <nav
      ref={containerRef}
      aria-label="Shop navigation"
      className="flex flex-col md:flex-row lg:items-center lg:gap-8"
    >
      {catalogMenus.map((menu) => {
        const isOpen = openMenu === menu.id;

        return (
          <div key={menu.id} className="relative">
            {/* Dropdown Trigger */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={isOpen ? `menu-${menu.id}` : undefined}
              onClick={() => handleToggle(menu.id)}
              className="group flex items-center gap-2 py-4 text-xs lg:text-sm border-t lg:border-none border-gray-300 w-full font-semibold text-[#0C0C0C]"
            >
              <span className=" lg:border-b lg:border-transparent hover:border-black transition duration-300 lg:pb-3 lg:pt-3">
                {menu.label}
              </span>

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
              <div
                id={`menu-${menu.id}`}
                className="absolute left-0 top-full z-50 min-w-56 rounded-lg border border-neutral-200 bg-white p-2 shadow-xl"
              >
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  Shop by {menu.label}
                </p>

                {menu.items.map((item) => {
                  const params = new URLSearchParams({
                    [menu.queryKey]: item.value,
                  });

                  const path = `/products?${params.toString()}`;

                  return (
                    <Link
                      key={item.value}
                      to={path}
                      onClick={() => setOpenMenu(null)}
                      className="block rounded-md px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="mt-2 border-t border-neutral-100 pt-2">
                  <Link
                    to="/products"
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-md px-3 py-2.5 text-xs font-semibold text-black hover:bg-neutral-100"
                  >
                    View All Products →
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
