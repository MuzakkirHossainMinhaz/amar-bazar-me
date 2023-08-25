import React from 'react';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminSideBar from '../components/Admin/Layout/AdminSideBar';
import AllUsers from "../components/Admin/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />

      <div className="flex items-start justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;