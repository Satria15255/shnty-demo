export default function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />

      <span
        aria-hidden="true"
        className={`
          flex h-5 w-5 shrink-0 items-center justify-center
          rounded border transition-all duration-200
          peer-focus-visible:ring-2
          peer-focus-visible:ring-black
          peer-focus-visible:ring-offset-2
          ${
            checked
              ? "border-[#0C0C0C] bg-[#0C0C0C] text-white"
              : "border-neutral-300 bg-white"
          }
        `}
      >
        {checked && (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        )}
      </span>

      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
}
