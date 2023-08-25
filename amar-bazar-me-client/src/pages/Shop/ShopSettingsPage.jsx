import React from "react";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex items-center justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <ShopSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;