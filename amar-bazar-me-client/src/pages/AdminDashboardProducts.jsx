import React from 'react';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminSideBar from '../components/Admin/Layout/AdminSideBar';
import AllProducts from "../components/Admin/AllProducts";

const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />

      <div className="flex items-start justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        
        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;