import React from 'react';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminSideBar from '../components/Admin/Layout/AdminSideBar';
import AllSellers from "../components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />

      <div className="flex items-start justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <AllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellers;