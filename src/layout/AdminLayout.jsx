import React from "react";
import Sidebar from "@/components/admin/ui/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="max-h-screen w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
