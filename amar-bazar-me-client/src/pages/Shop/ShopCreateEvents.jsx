import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import CreateEvent from "../../components/Shop/CreateEvent";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex items-center justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;