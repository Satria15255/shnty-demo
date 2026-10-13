import React, { useEffect, useState } from "react";
import OrderDetails from "@/features/orders/components/OrderDetails";
import {
    getMyOrders,
    confirmOrderReceived,
    cancelOrder,
} from "@/features/orders/services/orderService";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

const OrderPages = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState(6);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        status: "All",
    });
    const ordersStatus = [
        "All",
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Completed",
        "Cancelled",
    ];

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const res = await getMyOrders();
            setOrders(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleConfirmReceived = async (id) => {
        try {
            await confirmOrderReceived(id);
            toast.success("Order confirmed successfully");
            fetchMyOrders();
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to confirm order",
            );
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelOrder(id);
            toast.success("Order cancel successfully");
            fetchMyOrders();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed canceled order");
        }
    };

    // FILTER ORDER
    const filteredOrders = orders.filter((order) => {
        const matchStatus =
            filter.status === "All" || order.status === filter.status;

        return matchStatus;
    });

    // SORT ORDER (NEWEST FIRST)
    const sortedOrder = [...filteredOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="p-5">
            <div>
                {/* Filter Orders */}
                <nav className="flex md:justify-around gap-3 pb-6 border-b border-gray-400 md:w-full overflow-x-auto px-2">
                    {ordersStatus.map((ord) => (
                        <button
                            key={ord}
                            onClick={() =>
                                setFilter((prev) => ({
                                    ...prev,
                                    status: ord,
                                }))
                            }
                            className={`
                               flex-shrink-0 whitespace-nowrap h-10 lg:h-12 px-6  lg:px-7 text-sm rounded-3xl border border-gray-300 hover:bg-black hover:text-white transition duration-300
                            ${
                                filter.status === ord
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                            }
                        `}
                        >
                            {ord}
                        </button>
                    ))}
                </nav>

                {/* Order Section */}
                <section className="w-full h-auto lg:max-h-screen lg:overflow-y-auto">
                    {sortedOrder.length === 0 ? (
                        <p className="pt-20 text-center">Belum ada order.</p>
                    ) : (
                        <>
                            {sortedOrder.slice(0, pagination).map((order) => (
                                <OrderDetails
                                    order={order}
                                    handleCancel={handleCancel}
                                    handleConfirm={handleConfirmReceived}
                                />
                            ))}
                            <div className="flex justify-center p-3">
                                {sortedOrder.length > pagination && (
                                    <p
                                        onClick={() =>
                                            setPagination(pagination + 6)
                                        }
                                        className="text-sm lg:text-xl hover:underline transition duration-300"
                                    >
                                        View More
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </section>
    );
};

export default OrderPages;
