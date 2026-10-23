import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

const orderCard = ({ order, handleCancel, handleConfirm }) => {
  const navigate = useNavigate();
  const isPending = order.status === "Pending";
  const isDelivered = order.status === "Delivered";
  const isCompleted = order.status === "Completed";
  const isCancelled = order.status === "Cancelled";
  const isExpired = order.status === "Expired";

  const isTransfer = order.paymentMethod === "Transfer";
  const isUnpaid = order.paymentStatus === "Unpaid";

  const canPay = isPending && isTransfer && isUnpaid;

  const canCancel = isPending;

  const canConfirm = isDelivered;

  const canBuyAgain = isCompleted || isCancelled || isExpired;
  return (
    <article className="p-2 pt-6 ">
      <div
        key={order._id}
        className="border border-gray-300 mb-3 p-2 h-auto md:p-4 rounded-xl shadow space-y-3 "
      >
        <div className="flex flex-col  h-full gap-4">
          {/* Product  */}
          <p className="text-sm flex justify-between font-ysabeau">
            <p>Order Id:</p>
            {order._id}
          </p>
          <p className="text-sm flex justify-between font-ysabeau">
            <p>Order Status:</p>
            <OrderStatusBadge status={order.status} />
          </p>
          <div className="w-full rounded-lg border border-gray-300 p-5 ">
            {order.products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center  gap-4 mt-2"
              >
                <div className="flex gap-2 w-full lg:w-3/5 items-center">
                  <img
                    src={item.image || item.product?.image}
                    alt={item.name || item.product?.name}
                    className="w-14 h-14 object-cover bg-[#FBFAF7] rounded"
                  />
                  <div className="flex   flex-col">
                    <p className="text-xs md:text-lg font-bold">{item?.name}</p>
                    <div>
                      <p className="md:hidden text-xs">
                        {item.size} x {item.quantity}
                      </p>
                    </div>
                    <div className="hidden md:flex flex text-xs gap-2">
                      <p className="text-md lg:text-sm">Size: {item.size}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex w-1/5 justify-start">
                  <p className="text-md text-white lg:text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex w-1/5 justify-end">
                  <p className="text-[12px] lg:text-lg font-bold text-yellow-500">
                    ${item.subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* order Information */}
          <div className="w-full h-full flex flex-col gap-2 justify-around text-sm lg:text-sm font-ysabeau">
            <p className="flex justify-between">
              <p>Total Product:</p>
              {order.totalProducts}
            </p>

            <p className="flex justify-between">
              <p>Total Paid:</p>${order.finalPrice.toFixed(2)}
            </p>

            <p className="flex justify-between">
              <p>Order Time:</p>
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="flex justify-end w-full  gap-1">
              <div className="flex w-1/2 gap-2">
                <button
                  onClick={() => navigate(`/my-orders/${order._id}`)}
                  className="text-xs md:text-md lg:text-lg border border-gray-300 w-full px-1 py-1 rounded-md font-semibold hover:bg-gray-900 hover:text-white transition duration-300"
                >
                  Details
                </button>

                {canBuyAgain && (
                  <button
                    onClick={() => navigate("/products")}
                    className="text-xs md:text-md lg:text-lg border border-gray-300  px-1 py-1 w-full rounded-md font-semibold hover:bg-gray-900 hover:text-white transition duration-300 disabled:opacity-50  disabled:cursor-not-allowed
    disabled:hover:bg-transparent
    disabled:hover:text-current"
                  >
                    Buy Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default orderCard;
