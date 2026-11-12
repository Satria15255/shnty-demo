const HISTORY = [
  {
    id: 1,
    badge: "Pending Review",
    time: "10/13/2026, 1:27:55 PM",
    description: (
      <>
        Order registered in gateway by{" "}
        <span className="font-semibold text-slate-900">System (Checkout)</span>.
        Awaiting payment authorization from customer bank branch.
      </>
    ),
  },
  {
    id: 2,
    title: "Order Created",
    time: "10/13/2026, 1:27:55 PM",
    description:
      "Customer authenticated session initiated checkout flow with invoice reference #f0d8d.",
  },
];

function ClockIcon({ className = "" }) {
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
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const StatusHistory = ({ items = HISTORY, onAuditLogClick }) => {
  return (
    <section className="w-full rounded-xl bg-white p-2">
      {/* Header */}

      {/* Timeline */}
      <ol className="relative mt-6">
        {/* garis vertikal */}
        <span
          className="absolute bottom-0 left-[4px] top-2 w-px bg-slate-200"
          aria-hidden="true"
        />

        {items.map((item, index) => (
          <li
            key={item.id}
            className={`relative pl-7 ${
              index === items.length - 1 ? "pb-4" : "pb-7"
            }`}
          >
            {/* dot */}
            <span
              className="absolute left-0 top-[7px] h-[9px] w-[9px] rounded-full bg-slate-600 ring-4 ring-white"
              aria-hidden="true"
            />

            {/* judul / badge + waktu */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {item.badge ? (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  <ClockIcon className="h-3 w-3" />
                  {item.badge}
                </span>
              ) : (
                <span className="text-sm font-bold text-slate-900">
                  {item.title}
                </span>
              )}
              <time className="text-xs text-slate-500">{item.time}</time>
            </div>

            {/* deskripsi */}
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default StatusHistory;
