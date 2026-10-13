import { useEffect } from "react";
import FilterForm from "./FilterForm";

export default function FilterMobile({ searchParams, onApply, onClose }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);

        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close filter panel"
                onClick={onClose}
                className="absolute inset-0 h-full w-full bg-black/50"
            />

            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Product filters"
                className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white p-6 shadow-xl"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Filter Products</h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="text-2xl text-neutral-600"
                    >
                        ×
                    </button>
                </div>

                <FilterForm
                    searchParams={searchParams}
                    onApply={onApply}
                    onCancel={onClose}
                />
            </aside>
        </div>
    );
}
