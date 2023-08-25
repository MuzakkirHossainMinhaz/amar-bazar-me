import React from 'react';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminSideBar from '../components/Admin/Layout/AdminSideBar';
import AllWithdraw from "../components/Admin/AllWithdraw";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader />

      <div className="flex items-start justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <AllWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;