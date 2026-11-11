import React from "react";
import { getUserTransaction } from "@/pages/admin/orders/services/adminOrderService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const OrdersDetails = ({ onClose, onStatusChange }) => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      const res = await getUserTransaction(id);
      setOrder(res.data);
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

  return (
    <div className=" flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-3/5 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        <p className="mt-2 font-bold">Products:</p>
        <div className="w-full overflow-y-auto max-h-[45vh]">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="w-full flex items-center  justify-between"
              >
                <div className="flex py-1 items-center ">
                  <img
                    src={item.image}
                    alt={"Product"}
                    className="inline-block w-20 h-20 mr-2"
                  />
                  <div className="flex flex-col ">
                    <p className="font-bold text-md">{item.name}</p>
                    <div className="text-xs flex gap-2">
                      <p>Size {item.size}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>${item.pricePerUnit}</p>
                    </div>
                  </div>
                </div>
                <p className="font-bold text-yellow-500">${order.totalPrice}</p>
              </div>
            ))
          ) : (
            <li>No products found.</li>
          )}
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
            onClick={onClose}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;
