import React from "react";
import { PiUserCircle } from "react-icons/pi";

const UserList = ({ handleDetail, onOpenModal, users }) => {
  console.log(users);

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-x-hidden">
      <table className="w-full table-fixed text-xs">
        <thead className="bg-gray-100 w-full text-xs font-semibold text-left">
          <tr>
            <th className="pl-3 w-100 py-2">Customer Name</th>
            <th className="w-50">Address</th>
            <th>Orders</th>
            <th>Registered</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-300 py-8">
              <td className="flex items-center gap-2 pl-5 my-3 ">
                <div>
                  <PiUserCircle size={40} className="text-gray-800" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </td>
              <td>
                {user.address?.length > 0 &&
                user.address[0].country &&
                user.address[0].city
                  ? `${user.address[0].country}, ${user.address[0].city}`
                  : "Unlisted"}
              </td>{" "}
              <td>{user?.totalOrders || 0}</td>
              <td className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td>🟢 Active</td>
              <td>
                <button
                  onClick={() => onOpenModal(user._id)}
                  className="hover:bg-black hover:text-white border border-gray-300 transition duration-300 px-4 py-2 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
