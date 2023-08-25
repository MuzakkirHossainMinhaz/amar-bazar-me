import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import DashboardMessages from "../../components/Shop/DashboardMessages";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex items-center justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <DashboardSideBar active={8} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <DashboardMessages />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;