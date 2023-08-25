import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import CreateProduct from "../../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex items-start justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        
        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;