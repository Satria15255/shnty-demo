import { useState } from "react";

const OPTIONS = [
  { value: "processing", label: "Processing (Payment Confirmed)" },
  { value: "cancelled", label: "Cancelled (Order Voided)" },
];

function SwapIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 8h15" />
      <path d="m15 4 4 4-4 4" />
      <path d="M20 16H5" />
      <path d="m9 12-4 4 4 4" />
    </svg>
  );
}

function ChevronsIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m7 9 5-5 5 5" />
      <path d="m7 15 5 5 5-5" />
    </svg>
  );
}

function InfoIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

const UpdateStatus = ({
  options = OPTIONS,
  defaultValue = "processing",
  onSubmit,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <section className="w-full   rounded-xl bg-white p-2 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Update Status</h2>
        <SwapIcon className="h-5 w-5 text-slate-500" />
      </div>

      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Pending orders can transition strictly to{" "}
        <span className="font-bold text-blue-600">Processing</span> or{" "}
        <span className="font-bold text-red-800">Cancelled</span>.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        {/* Select */}
        <label
          htmlFor="order-state"
          className="block text-xs font-semibold text-slate-900"
        >
          Select New Order State
        </label>

        <div className="relative mt-2">
          <select
            id="order-state"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 pr-10 text-sm text-slate-800 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronsIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>

        {/* Info box */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-slate-100 px-3.5 py-3">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p className="text-xs leading-relaxed text-slate-500">
            This action immediately updates the client dashboard and generates
            an activity notification email.
          </p>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          <CheckIcon className="h-4 w-4" />
          Update Status
        </button>
      </form>
    </section>
  );
};

export default UpdateStatus;
