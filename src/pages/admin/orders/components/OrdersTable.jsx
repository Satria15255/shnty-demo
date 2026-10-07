import React from "react";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";

const OrdersTable = ({ order, onOpenModal }) => {
  console.log(order);
  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-x-hidden">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 w-full text-xs p-2 table-fixed">
          <tr>
            <th className="text-left py-2 w-20 pl-2">Id</th>
            <th className="text-left">Name</th>
            <th className="text-left w-40">Order Time</th>
            <th className="text-left">Order Status</th>
            <th className="text-left">Payment Method</th>
            <th className="text-left">Payment Status</th>
            <th className="text-left">Total</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto max-h-[75vh] w-full">
        <table className="w-full table-fixed">
          <tbody className="w-full">
            {order.map((o) => (
              <tr key={o._id} className="border-b border-gray-300 text-xs ">
                <td className="py-4 pl-2 w-18">#{o._id.slice(-5)}</td>
                <td className="p-2">{o.user.name}</td>
                <td className="p-2 w-40">
                  {new Date(o.createdAt).toLocaleString()}
                </td>
                <td>
                  {" "}
                  <OrderStatusBadge status={o.status} />
                </td>
                {o.paymentMethod === "Transfer" ? (
                  <td className="p-2">
                    <p className="flex">{o.paymentMethod}</p>
                    <p>({o.transferProvider || "unavailable"})</p>
                  </td>
                ) : (
                  <td className="p-2">{o.paymentMethod}</td>
                )}

                <td>
                  <PaymentStatusBadge status={o.paymentStatus} />
                </td>
                <td className="p-2">${o.totalPrice}</td>
                <td className="">
                  <button
                    onClick={() => onOpenModal(o)}
                    className="text-gray-900 border border-gray-400 hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg px-5 py-2"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
