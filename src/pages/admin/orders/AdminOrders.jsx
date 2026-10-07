import React, { useEffect, useState } from "react";
import OrdersTable from "@/pages/admin/orders/components/OrdersTable";
import OrdersDetails from "@/pages/admin/orders/components/OrdersDetails";
import { toast } from "react-toastify";
import { getOrdersSummary } from "@/pages/admin/dashboard/services/adminDashboardService";
import { getAllTransactions } from "@/pages/admin/orders/services/adminOrderService";
import { updateTransactionStatus } from "@/pages/admin/orders/services/adminOrderService";
import { ordersConfig } from "@/pages/admin/orders/config/OrdersConfig";
import DashboardStatsCard from "@/components/admin/ui/DashboardStatsCard";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState([]);
  const [range, setRange] = useState("7d");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [filter, setFilter] = useState({
    status: "All Status",
    method: "All Method",
    search: "",
  });
  const orderStatus = [
    "All Status",
    "Waiting for Payment",
    "Processing",
    "Shipped",
    "Delivered",
    "Completed",
    "Cancelled",
  ];
  const paymentMethod = [
    "All Method",
    "Cash on Delivery",
    "Transfer",
    "Visa",
    "Mastercard",
  ];
  const orderPerPages = 8;

  const fetchOrdersSummary = async (range) => {
    try {
      const res = await getOrdersSummary(range);
      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersSummary();
  }, [range]);

  const fetchOrders = async () => {
    const res = await getAllTransactions();
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateTransactionStatus(orderId, newStatus);
      setOrder((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    }
  };

  const filterOrder = () => {
    return order.filter((order) => {
      const matchStatus =
        filter.status === "All Status" || order.status === filter.status;
      const matchMethod =
        filter.method === "All Method" ||
        order.paymentMethod === filter.method ||
        order.transferProvider === filter.method;
      const matchSearch =
        filter.search.trim() === "" ||
        order._id.toLowerCase().includes(filter.search.toLowerCase());

      const orderDate = new Date(order.createdAt);

      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate)
        : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }

      const matchDate =
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate);

      return matchStatus && matchMethod && matchSearch && matchDate;
    });
  };

  const filteredOrder = filterOrder();

  const sortOrders = [...filteredOrder].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const totalPages = Math.ceil(sortOrders.length / orderPerPages);
  const indexOfLastOrder = currentPage * orderPerPages;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPages;
  const currentOrder = sortOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filter.status,
    filter.method,
    filter.search,
    dateRange.startDate,
    dateRange.endDate,
  ]);

  const getPagination = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    // halaman 1-3
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, totalPages];
    }

    // halaman terakhir
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // halaman tengah
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <main className="w-full flex flex-col gap-4 px-4 py-9 ">
      <header className="flex justify-between px-2">
        <p className="text-4xl font-bold font-sans">Order History</p>
        <p className="text-sm">
          <span className="text-black">Dashboard /</span> Order
        </p>
      </header>

      <section className="flex justify-around gap-4 ">
        {ordersConfig.map((item) => (
          <DashboardStatsCard
            key={item.key}
            title={item.title}
            data={summary[item.key]}
            icon={item.icon}
          />
        ))}
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-gray-300 p-5 text-xs">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search Order Id..."
            value={filter.search}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
            className="w-full px-2 py-2 text-xs lg:text-sm bg-white border border-gray-300 rounded-xl"
          />
        </div>
        <div className="flex justify-around gap-5 items-center">
          <input
            type="date"
            placeholder="Start date"
            value={dateRange.startDate}
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
          <p>to</p>
          <input
            type="date"
            placeholder="End date"
            value={dateRange.endDate}
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
          <select
            name=""
            id=""
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            {orderStatus.map((order) => (
              <option key={order} value={order}>
                {order}
              </option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, method: e.target.value }))
            }
          >
            {paymentMethod.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section>
        <OrdersTable order={currentOrder} onOpenModal={openModal} />

        <nav className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">
            Showing {indexOfFirstOrder + 1} -{" "}
            {Math.min(indexOfLastOrder, sortOrders.length)} of{" "}
            {sortOrders.length} orders
          </p>

          {/*Pagination button */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === 1
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              ←
            </button>

            <div className="flex gap-2">
              {getPagination().map((item, index) =>
                item === "..." ? (
                  <span
                    key={index}
                    className="w-10 h-10 flex items-center justify-center text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(item)}
                    className={`w-10 h-10 rounded-lg border border-gray-200 transition
        ${currentPage === item ? "bg-black text-white" : "hover:bg-gray-100"}`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === totalPages
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              →
            </button>
          </div>
        </nav>
      </section>

      {selectedOrder && (
        <OrdersDetails
          order={selectedOrder}
          onClose={closeModal}
          onStatusChange={handleStatusChange}
        />
      )}
    </main>
  );
};

export default AdminOrders;
