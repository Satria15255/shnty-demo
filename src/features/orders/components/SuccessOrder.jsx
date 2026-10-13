import React, { useEffect, useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { getTransactionById } from "@/features/transactions/services/transactionService";
import { getAllProducts } from "@/features/products/services/productService";
import { FcApproval } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { LazyMotion, domAnimation } from "framer-motion";

const SuccesTransaction = () => {
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

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="mt-8 md:mt-16 xl:pt-16 p-2 md:p-4 flex flex-col items-center  ">
            {latestOrder ? (
                <section className="mb-8 p-4 flex flex-col gap-4 rounded-lg w-full max-w-6xl">
                    <div className="flex flex-col gap-3 items-center">
                        <p className="text-6xl  md:text-8xl">
                            <FcApproval />
                        </p>
                        <p className="text-lg md:text-3xl font-semibold md:pb-6 text-center text-green-600 font-montserrat">
                            Your Order is Confirmed! 🎉
                        </p>
                        <p className="text-sm text-gray-600 ">
                            Order ID : {latestOrder._id}
                        </p>
                    </div>
                    {/*Order Updpate*/}
                    <div className="flex flex-col justify-center  border rounded-xl border-gray-200 gap-2 p-3">
                        <p className="font-semibold font-montserrat">
                            Order Updates
                        </p>
                        {latestOrder.paymentMethod === "Cash on Delivery" ? (
                            <p className="text-sm text-gray-600">
                                {" "}
                                Wait for the order process, and check
                                periodically during this time.
                            </p>
                        ) : (
                            <p className="text-sm text-red-700">
                                {" "}
                                Make your payment using the navigation button
                                below, and your order will be processed
                                immediately.
                            </p>
                        )}
                    </div>
                    {/*Order Info*/}
                    <div className="flex flex-col justify-center gap-4 border rounded-xl border-gray-200 p-3">
                        <p className="font-semibold font-montserrat">
                            Order Info
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <p className="flex flex-col text-gray-600 ">
                                Order Date:{" "}
                                <span className="font-ysabeau text-black font-bold text-sm lg:text-xl">
                                    {new Date(
                                        latestOrder.createdAt,
                                    ).toLocaleString()}
                                </span>
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Status:
                                <span className="font-ysabeau text-black font-bold text-sm lg:text-xl">
                                    {latestOrder.status}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Payment Method:
                                <span className="font-ysabeau text-black font-bold text-sm lg:text-xl">
                                    {latestOrder.paymentMethod}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Payment Status:
                                <span className="font-ysabeau text-black font-bold text-sm lg:text-xl">
                                    {latestOrder.paymentStatus}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Phone Number:
                                <span className="font-ysabeau text-black font-bold text-sm lg:text-xl">
                                    {latestOrder.phoneNumber}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Address:
                                <span className="font-ysabeau text-black font-bold text-sm lg:text-xl">
                                    {latestOrder.shippingAddress}
                                </span>{" "}
                            </p>
                        </div>
                    </div>
                    {/*Products Ordered*/}
                    <div className="mt-3 w-full p-3 ">
                        <p className="font-semibold font-montserrat">
                            Your Order
                        </p>
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
                                                    <p className="text-md lg:text-xl w-60 md:w-80 font-semibold">
                                                        {item.name}{" "}
                                                    </p>
                                                    <div className="flex  gap-8 md:justify-between text-xs md:text-lg text-gray-600">
                                                        <p className="font-ysabeau text-black  ">
                                                            Size :
                                                            <span className="text-black font-semibold">
                                                                {item.size}
                                                            </span>{" "}
                                                        </p>
                                                        <p className="text-yellow-500 md:hidden flex  font-semibold">
                                                            ${item.pricePerUnit}
                                                            .00
                                                        </p>
                                                        <p className="font-ysabeau hidden md:flex text-black  text-lg">
                                                            Qty :{" "}
                                                            <span className="text-black font-semibold">
                                                                {item.quantity}
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
                    {/*Order Summary*/}
                    <div className="flex flex-col border border-gray-300 p-3 rounded-xl gap-3">
                        <p className="font-semibold font-montserrat">
                            Order Summary
                        </p>
                        <div className="w-full ">
                            <p className="flex justify-between text-gray-600">
                                {" "}
                                Subtotal:{" "}
                                <span className="text-xl text-yellow-500 font-ysabeau font-semibold">
                                    {" "}
                                    ${latestOrder.totalPrice.toFixed(2)}
                                </span>
                            </p>
                            <p className="flex justify-between text-gray-600">
                                {" "}
                                Saving:{" "}
                                <span className=" font-ysabeau   text-xl">
                                    {" "}
                                    ${latestOrder.discountAmount}
                                </span>
                            </p>
                            <p className="flex justify-between text-gray-600">
                                {" "}
                                Delivery:{" "}
                                <span className=" font-ysabeau  text-xl">
                                    {" "}
                                    Free
                                </span>
                            </p>
                            <p className="flex justify-between text-gray-600">
                                {" "}
                                Total:{" "}
                                <span className="text-xl text-yellow-500 font-ysabeau font-semibold">
                                    {" "}
                                    ${latestOrder.finalPrice.toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 md:justify-end md:items-center w-full mt-5">
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm lg:text-lg font-semibold h-12 w-full md:w-1/5 border border-gray-300 rounded-xl hover:bg-black hover:text-white"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() =>
                                navigate(`/paymentOrder/${latestOrder._id}`)
                            }
                            className="text-sm lg:text-lg font-semibold h-12 w-full bg-[#0C0C0C] text-white md:w-1/5 hover:border border-gray-300 rounded-xl hover:bg-white hover:text-[#0C0C0C] transition duration-200"
                        >
                            Paid Now
                        </button>
                    </div>
                </section>
            ) : (
                <p>Loading transaction details...</p>
            )}

            <aside className="mt-8 max-w-7xl">
                <h2 className="text-sm text-center lg:text-xl font-bold mb-4">
                    You Might Like
                </h2>
                <div className="grid grid-cols-2 place-items-center md:grid-cols-4 gap-3">
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

export default SuccesTransaction;
