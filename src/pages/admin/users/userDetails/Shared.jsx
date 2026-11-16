// Komponen kecil yang dipakai ulang oleh semua section.

export function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl bg-white p-6 shadow-[0_1px_12px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  icon: Icon,
  iconWrapClassName = "bg-indigo-50 text-indigo-600",
  title,
  subtitle,
  action = null,
  divider = false,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        divider ? "border-b border-slate-100 pb-4" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconWrapClassName}`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-900">{title}</h2>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
      {action}
    </div>
  );
}
