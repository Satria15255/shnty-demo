import React from "react";
import { getUserTransaction } from "@/pages/admin/orders/services/adminOrderService";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/FormatedDate";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";
import ProductOrderTable from "./orderDetails/ProductOrderTable";
import CustInformation from "./orderDetails/CustInformation";
import CostSummary from "./orderDetails/CostSummary";
import ShippingDetail from "./orderDetails/ShippingDetail";
import StatusHistory from "./orderDetails/StatusHistory";
import UpdateStatus from "./orderDetails/UpdateStatus";
import { FaArrowLeft } from "react-icons/fa";

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
        <div className="w-full flex justify-between items-center">
          <span className="text-xs">Dashboard / All-order / {order._id}</span>

          <button
            onClick={() => navigate("/admin/all-orders")}
            className="bg-gray-800 text-white flex gap-3 items-center px-4 py-2 rounded hover:bg-gray-600"
          >
            <FaArrowLeft />
            Back to Orders
          </button>
        </div>
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
        <div className="w-4/7 space-y-4">
          <section className="w-full space-y-2">
            <p className="mt-2 text-xl font-bold">Ordered Products:</p>
            <ProductOrderTable
              items={order.products || []}
              totalPrice={order.totalPrice}
            />
          </section>
          <section className="w-full space-y-2">
            <p className="mt-2 text-xl font-bold">Cost Summary:</p>
            <CostSummary details={order} />
          </section>
          <section className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Status History
              </h2>
              <button
                type="button"
                className="text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Audit Log
              </button>
            </div>
            <StatusHistory details={order} />
          </section>
        </div>
        <div className="w-3/7 space-y-4">
          <section className="w-full space-y-2">
            <p className="mt-2 text-xl font-bold">Customer Information:</p>
            <CustInformation details={user} />
          </section>
          <section className="w-full space-y-2">
            <p className="mt-2 text-xl font-bold">Shipping Detail:</p>
            <ShippingDetail details={order} />
          </section>
          <section className="w-full space-y-2">
            <UpdateStatus details={order} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default OrdersDetails;
