import { Card, SectionHeader } from "./shared";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  ReceiptIcon,
  XCircleIcon,
} from "./Icon";
import { formatDate } from "@/utils/FormatedDate";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const STATUS_STYLES = {
  pending: { className: "bg-slate-100 text-slate-600", icon: ClockIcon },
  processing: { className: "bg-blue-50 text-blue-700", icon: ClockIcon },
  completed: {
    className: "bg-emerald-50 text-emerald-700",
    icon: CheckCircleIcon,
  },
  cancelled: { className: "bg-red-50 text-red-700", icon: XCircleIcon },
};

function StatusPill({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${style.className}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

const COLUMNS = [
  "Order ID",
  "Username",
  "Order Time",
  "Total Price",
  "Total Product",
  "Order Status",
];

export default function CustomerOrders({
  orders = [],
  total = orders.length,
  onViewMore,
}) {
  const hasMore = orders.length < total;

  return (
    <Card>
      <SectionHeader
        icon={ReceiptIcon}
        title="Customer Orders"
        subtitle="Transaction History & Fulfillment Status"
        action={
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
            Showing {orders.length} of {total} orders
          </span>
        }
      />

      <div className="mt-5 overflow-x-auto rounded-xl">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-slate-100/80">
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 text-[10px] font-semibold uppercase leading-tight tracking-wider text-slate-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-100 last:border-b-0"
              >
                <td className="px-4 py-4 text-xs font-medium text-slate-800">
                  #{order._id}
                </td>
                <td className="px-4 py-4 text-xs font-medium text-blue-700">
                  {order.name}
                </td>
                <td className="px-4 py-4 font-mono text-[11px] leading-relaxed text-slate-600">
                  {formatDate(order.createdAt)}
                </td>

                <td className="px-4 py-4 text-sm font-bold text-slate-900">
                  {currency.format(order.totalPrice)}
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[11px] font-semibold text-slate-700">
                    {order.products.length}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StatusPill status={order.status} />
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-10 text-center text-xs text-slate-500"
                >
                  This customer has no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onViewMore}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <ChevronDownIcon className="h-3.5 w-3.5" />
            View More Orders
          </button>
        </div>
      )}
    </Card>
  );
}
