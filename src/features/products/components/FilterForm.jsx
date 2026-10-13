import { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox";

import {
  FILTER_GROUPS,
  emptyFilters,
  readFilters,
} from "@/constants/filterOption";

export default function FilterForm({ searchParams, onApply, onCancel }) {
  const queryString = searchParams.toString();

  const [draftFilters, setDraftFilters] = useState(() =>
    readFilters(searchParams),
  );

  // Update draft hanya ketika applied filters di URL berubah
  useEffect(() => {
    setDraftFilters(readFilters(new URLSearchParams(queryString)));
  }, [queryString]);

  // Toggle multi-selection: category, type, size
  const toggleArray = (key, value) => {
    setDraftFilters((prev) => {
      const selected = prev[key];

      return {
        ...prev,
        [key]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      };
    });
  };

  // Toggle independent boolean filters
  const toggleBoolean = (key, checked) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply(draftFilters);
  };

  const handleCancel = () => {
    setDraftFilters(readFilters(searchParams));
    onCancel?.();
  };

  // Reset draft saja, belum mengubah URL
  const handleReset = () => {
    setDraftFilters(emptyFilters());
  };

  // Langsung hapus semua applied filters
  const handleClearAll = () => {
    const cleared = emptyFilters();
    setDraftFilters(cleared);
    onApply(cleared);
  };

  return (
    <form onSubmit={handleApply} className="flex flex-col gap-5">
      {FILTER_GROUPS.map((group) => (
        <section key={group.key} className="border-b border-neutral-200 pb-5">
          <h3 className="mb-3 text-sm font-semibold">{group.label}</h3>

          <div className="flex flex-col">
            {group.options.map((option) => (
              <FilterCheckbox
                key={option}
                label={option}
                checked={draftFilters[group.key].includes(option)}
                onChange={() => toggleArray(group.key, option)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Special Filters */}
      <section className="border-b border-neutral-200 pb-5">
        <h3 className="mb-3 text-sm font-semibold">Special Filters</h3>

        <FilterCheckbox
          label="Discount"
          checked={draftFilters.discount}
          onChange={(checked) => toggleBoolean("discount", checked)}
        />

        <FilterCheckbox
          label="New Arrival"
          checked={draftFilters.latest}
          onChange={(checked) => toggleBoolean("latest", checked)}
        />
      </section>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="w-full rounded-md bg-[#0C0C0C] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          Apply Filter
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm hover:bg-neutral-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm hover:bg-neutral-100"
          >
            Reset
          </button>
        </div>

        <button
          type="button"
          onClick={handleClearAll}
          className="py-2 text-sm text-neutral-500 transition-colors hover:text-black"
        >
          Clear All Filters
        </button>
      </div>
    </form>
  );
}
