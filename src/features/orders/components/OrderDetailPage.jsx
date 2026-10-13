import React, { useEffect, useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { getTransactionById } from "@/features/transactions/services/transactionService";
import { getAllProducts } from "@/features/products/services/productService";
import { FcApproval, FcOk } from "react-icons/fc";
import { formatDate } from "@/utils/FormatedDate";
import { useNavigate, useParams } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import OrderStatusBadge from "@/components/ui/PaymentStatusBadge";

import Loader from "@/components/common/Loader";

const OrderDetailPage = () => {
    const [latestOrder, setlatestOrder] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: order } = await getTransactionById(id);
                setlatestOrder(order);
                console.log("isinya order", order);

                const { data: products } = await getAllProducts();
                const shuffled = products.sort(() => 0.5 - Math.random());
                setRecommended(shuffled.slice(0, 4));
            } catch (error) {
                console.error("Failed get succes transaction", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const cashOnDeliveryPayment =
        latestOrder.paymentMethod === "Cash on Delivery";

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="mt-8 md:mt-17 xl:pt-16 p-2 md:p-4 flex flex-col items-center">
            {latestOrder ? (
                <div className="mb-8 p-4 flex flex-col w-full   justify-center rounded-lg max-w-7xl">
                    {/* Purchase Details */}
                    <section className="flex flex-col justify-center w-full">
                        {/* Product Details\ */}
                        <div className="mt-3 w-full">
                            <p className="font-semibold text-lg md:text-xl font-montserrat md:border-b pb-4">
                                📦 Product Order:
                            </p>
                            <div className="p-3">
                                {latestOrder.products &&
                                latestOrder.products.length > 0 ? (
                                    <ul className="list-disc list-inside border-t mt-1">
                                        {latestOrder.products.map((item, i) => (
                                            <div key={i}>
                                                <div className="flex items-center justify-between w-full mt-3 border-b border-gray-300 pb-3">
                                                    <div className="flex items-center  w-full">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className=" w-15 md:w-20 h-full object-cover rounded mr-4"
                                                        />
                                                        <div className="flex flex-col justify-around">
                                                            <p className="text-md md:text-xl w-60 md:w-80 font-semibold">
                                                                {item.name}{" "}
                                                            </p>
                                                            <div className="flex  gap-8 md:justify-between text-xs md:text-lg text-gray-600">
                                                                <p className="font-ysabeau  font-bold ">
                                                                    Size:
                                                                    <span className="">
                                                                        {
                                                                            item.size
                                                                        }
                                                                    </span>{" "}
                                                                </p>
                                                                <p className="text-yellow-500 md:hidden flex  font-semibold">
                                                                    $
                                                                    {
                                                                        item.pricePerUnit
                                                                    }
                                                                    .00
                                                                </p>
                                                                <p className="font-ysabeau hidden md:flex text-black font-bold text-lg">
                                                                    Qty:{" "}
                                                                    <span className="text-gray-600">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden w-20">
                                                        <p className="text-gray-600 xt-sm">
                                                            {item.size} x{" "}
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-end w-full">
                                                        <p className="text-yellow-500 hidden md:flex text-xl font-semibold">
                                                            ${item.pricePerUnit}
                                                            .00
                                                        </p>
                                                        <p className="font-ysabeau md:hidden text-gray-600 font-bold text-lg">
                                                            {item.quantity}x
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No product</p>
                                )}
                            </div>
                        </div>
                        {/* Order Details */}
                        <div className="   text-[#0C0C0C] rounded-3xl">
                            <div className="mt-10 w-full flex flex-col gap-4">
                                <p className="text-lg md:text-xl font-semibold font-montserrat">
                                    🧾 Order Details:
                                </p>
                                <div className="flex flex-col gap-3 border border-gray-200 rounded-xl text-sm font-ysabeau lg:text-lg p-4">
                                    <p className="flex justify-between">
                                        <span>Order ID:</span>
                                        <p>{latestOrder._id}</p>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Order Time:</span>
                                        {new Date(
                                            latestOrder.createdAt,
                                        ).toLocaleString()}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Order Status:</span>{" "}
                                        {latestOrder.status}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="mt-10 w-full flex flex-col gap-4">
                                <p className="font-semibold font-montserrat text-lg md:text-xl">
                                    👤 Contact Details:
                                </p>
                                <div className="flex flex-col gap-3 border border-gray-200 rounded-xl text-sm font-ysabeau lg:text-lg p-4">
                                    <p className="flex  justify-between">
                                        <span>Name :</span> {latestOrder.name}
                                    </p>
                                    <p className="flex h-auto justify-between">
                                        <span>Address :</span>{" "}
                                        {latestOrder.shippingAddress}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Phone Number :</span>{" "}
                                        {latestOrder.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            {/* Payment Details */}
                            <div className="mt-10 w-full flex flex-col gap-4">
                                <p className="font-semibold font-montserrat text-lg md:text-xl">
                                    💳 Payment Details:
                                </p>
                                <div className="flex flex-col gap-3 border border-gray-200 rounded-xl text-sm font-ysabeau lg:text-lg p-4">
                                    <p className="flex justify-between">
                                        <span>Total Price:</span> $
                                        {latestOrder.totalPrice.toFixed(2)}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Voucher:</span>
                                        {latestOrder.voucherCode ? (
                                            <p>{latestOrder.voucherCode}</p>
                                        ) : (
                                            <p>Not Used</p>
                                        )}
                                    </p>

                                    <p className="flex justify-between">
                                        <span>Total Saving:</span> - $
                                        {latestOrder.discountAmount.toFixed(2)}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Total Paid:</span> $
                                        {latestOrder.finalPrice.toFixed(2)}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Payment Method:</span>{" "}
                                        {latestOrder.paymentMethod}{" "}
                                        {latestOrder.transferProvider}
                                    </p>
                                    {latestOrder.paymentMethod ===
                                        "Transfer" && (
                                        <>
                                            <p className="flex justify-between">
                                                <span>Payment Status:</span>{" "}
                                                {latestOrder.paymentStatus}
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Paid At:</span>{" "}
                                                {new Date(
                                                    latestOrder.paidAt,
                                                ).toLocaleString()}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 md:justify-end md:items-center w-full pb-1 pt-6">
                            <button
                                onClick={() =>
                                    navigate(`/dashboard?tab=my-orders`)
                                }
                                className="text-sm lg:text-lg  text-center font-semibold h-12 w-1/2 md:w-1/4 border border-gray-300 rounded-2xl hover:bg-[#0C0C0C] hover:text-white transition duration-300"
                            >
                                My Orders
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="text-sm lg:text-lg  font-semibold h-12 w-1/2 md:w-1/4 border border-gray-300 rounded-2xl bg-[#0C0C0C] text-white hover:bg-white hover:text-black transition duration-300"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </section>
                </div>
            ) : (
                <p>Loading transaction details...</p>
            )}

            <aside className="mt-8 max-w-7xl">
                <p className=" text-sm lg:text-2xl text-center font-semibold pb-4">
                    You Might Like
                </p>
                <div className="grid grid-cols-2 items-center md:grid-cols-4 gap-3">
                    <LazyMotion features={domAnimation}>
                        {recommended.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </LazyMotion>
                </div>
            </aside>
        </main>
    );
};

export default OrderDetailPage;
