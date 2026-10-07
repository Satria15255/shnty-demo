import React from "react";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

const LatestTransactionsTabel = ({ order, onOpenModal }) => {
  return (
    <div className="w-full bg-white mt-4 border border-gray-300 rounded-xl p-3">
      <h2 className="pb-4">Latest Orders</h2>
      <table className="w-full table-fixed">
        <thead className="border-b border-gray-400 w-full py-2 text-sm">
          <tr>
            <th className="text-left py-2">Order Id</th>
            <th className="text-left">Qty</th>
            <th className="text-left">Price</th>
            <th className="text-left">Date</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto overflow-x-hidden max-h-[65vh] w-full">
        <table className="w-full table-fixed">
          <tbody className="w-full py-5">
            {order.map((o) => (
              <tr
                key={o._id}
                className="border-b border-gray-200 w-full table-fixed text-sm"
              >
                <td className="py-6">{o._id.slice(-5)}</td>
                <td className="p-2">{o.totalProducts}</td>
                <td className="p-2">${o.totalPrice}</td>
                <td className="p-2">
                  {" "}
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <OrderStatusBadge status={o.status} />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestTransactionsTabel;
