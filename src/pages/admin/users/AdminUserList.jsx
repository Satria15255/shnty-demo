// AdminUserList.jsx
import React, { useEffect, useState } from "react";
import UserList from "@/pages/admin/users/components/UserList";
import UserDetail from "@/pages/admin/users/components/UserDetails";
import {
  getAllUsers,
  getUserTransactions,
} from "@/pages/admin/users/services/adminUserService";
import { getUsersSummary } from "@/pages/admin/dashboard/services/adminDashboardService";
import { usersConfig } from "@/pages/admin/users/config/UsersConfig";
import DashboardStatsCard from "@/components/admin/ui/DashboardStatsCard";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [range, setRange] = useState("7d");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userlistPerPages = 8;

  const fetchUsersSummary = async (range) => {
    try {
      const res = await getUsersSummary(range);
      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsersSummary();
  }, [range]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDetail = async (userId) => {
    try {
      const res = await getUserTransactions(userId);
      setSelectedUser(userId);
      setTransactions(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };
  const sortUserList = [...users].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const totalPages = Math.ceil(users.length / userlistPerPages);
  const indexOfLastProduct = currentPage * userlistPerPages;
  const indexOfFirstProduct = indexOfLastProduct - userlistPerPages;
  const currentUsers = sortUserList.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

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

  console.log(users);
  return (
    <main className="px-4 w-full flex flex-col gap-4 py-9">
      <header className="flex flex-col gap-2">
        <p className="text-4xl font-sans font-bold">Users Management</p>
        <p className="text-sm text-gray-700 font-sans">
          Manage every registered account inside Zafaris
        </p>
      </header>
      <section className="flex justify-around gap-4">
        {usersConfig.map((item) => (
          <DashboardStatsCard
            key={item.key}
            title={item.title}
            data={summary[item.key]}
            icon={item.icon}
          />
        ))}
      </section>
      <section>
        <div className="flex justify-between items-center gap-3 pb-3">
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Search user name..."
              className="w-full px-2 py-2 text-xs lg:text-sm w-1/2 bg-white border border-gray-300 rounded-xl"
            />
          </div>
          <div className="w-1/2 flex justify-end gap-3">
            <div className="w-1/4">
              <select
                name=""
                id=""
                className="bg-white py-2 px-2 rounded-xl border border-gray-300 w-full text-sm"
              >
                <option value="All User">All User</option>
                <option value="User Role">User Role</option>
                <option value="Admin Role">Admin Role</option>
                <option value="">Most Buy</option>
              </select>
            </div>
            <div className="w-1/4">
              <select
                name=""
                id=""
                className="bg-white py-2 px-2 rounded-xl border border-gray-300 w-full text-sm"
              >
                <option value="All User">All Status</option>
                <option value="User Role">Active</option>
                <option value="Admin Role">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <UserList users={currentUsers} onOpenModal={handleDetail} />
        <nav className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">
            Showing {indexOfFirstProduct + 1} -{" "}
            {Math.min(indexOfLastProduct, users.length)} of {users.length} Cust
          </p>

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

      {isModalOpen && (
        <UserDetail
          userId={selectedUser}
          transactions={transactions}
          handleDetail={handleDetail}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default AdminUserList;
