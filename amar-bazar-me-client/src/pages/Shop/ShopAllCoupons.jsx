import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllCoupons from "../../components/Shop/AllCoupons";

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;