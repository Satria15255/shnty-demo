import React from "react";
import { getUserTransaction } from "@/pages/admin/orders/services/adminOrderService";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/FormatedDate";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";
import ProductOrderTable from "./orderDetails/ProductOrderTable";
import CustInformation from "./orderDetails/CustInformation";

const OrdersDetails = ({ onClose, onStatusChange }) => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const res = await getUserTransaction(id);
      setOrder(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [id]);

  console.log(order);

  if (!order) return null;

  const user = order || {};
  const items = order.products || [];

  const orderDate = () => {
    if (!order.createdAt) {
      return null;
    } else {
      return formatDate(order.createdAt);
    }
  };

  const orderStats = [
    {
      title: "Order Status",
      inf: <OrderStatusBadge status={order.status} />,
      icon: "B",
    },
    {
      title: "Payment Status",
      inf: <PaymentStatusBadge status={order.paymentStatus} />,
      icon: "B",
    },
    {
      title: "Payment Method",
      inf: `${order.paymentMethod}`,
      icon: "B",
    },
    {
      title: "Total Amount",
      inf: `$${order.finalPrice}`,
      icon: "B",
    },
  ];

  return (
    <main className="bg-white rounded-xl p-6 w-full shadow-lg">
      <header className="flex flex-col gap-4 justify-center">
        <span className="text-xs">Dashboard / All-order / {order._id}</span>
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-gray-500">
            Placed On formatDate {orderDate}
          </p>
        </div>
        <div className="flex space-x-4 justify-center items-center">
          {orderStats.map((o) => (
            <div className="w-1/4 h-auto bg-white py-6 px-2 flex items-center justify-center gap-5 rounded-xl border border-gray-300 ">
              <div className=" h-full flex items-center">
                <p className="text-xl flex justify-center items-center p-3 text-[#F3E5AB] bg-gray-900 rounded-full">
                  {o.icon}
                </p>
              </div>
              <div className="w-full flex flex-col">
                <p className="text-sm text-gray-600">{o.title}</p>
                <p className="text-xl font-bold">{o.inf}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      <div className="flex gap-4 w-full">
        <section className="w-2/2">
          <p className="mt-2 font-bold">Ordered Products:</p>
          <ProductOrderTable
            items={order.products || []}
            totalPrice={order.totalPrice}
          />
        </section>
        <section className="w-1/3">
          <p className="mt-2 font-bold">Customer Information:</p>

          <CustInformation details={user} />
        </section>
      </div>

      <div>
        <p className="flex justify-between">
          <strong>User:</strong> {user.name || "Uknown user"}
        </p>
        <p className="flex justify-between">
          <strong>Email:</strong> {user.email || "-"}
        </p>
        <p className="flex justify-between">
          <strong>Message:</strong> {order.message || "-"}
        </p>
        <p className="flex justify-between">
          <strong>Payment Method:</strong> {order.paymentMethod || "-"}
        </p>
        <p className="flex justify-between">
          <strong>Shipping Method:</strong> {order.shippingMethod || "-"}
        </p>
        <p className="flex justify-between">
          <strong>Shipping Address:</strong> {order.shippingAddress || "-"}
        </p>
      </div>

      <div className="mt-4">
        <label className="font-semibold">Update Status:</label>
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className="block mt-1 border px-2 py-1 rounded"
        >
          <option value="Waiting for Payment">Pending Confirmation</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate("/admin/all-orders")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </main>
  );
};

export default OrdersDetails;
