import FilterForm from "./FilterForm";

export default function FilterSidebar({ searchParams, onApply }) {
  return (
    <aside className="w-full pr-6">
      <h2 className="mb-6 text-lg font-semibold">Filter Products</h2>

      <FilterForm searchParams={searchParams} onApply={onApply} />
    </aside>
  );
}
