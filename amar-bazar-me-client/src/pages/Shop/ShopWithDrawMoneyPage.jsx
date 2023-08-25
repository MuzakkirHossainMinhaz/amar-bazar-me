import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex items-center justify-between w-full">
        <div className="w-[70px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>

        <div className="w-full justify-center flex h-[calc(100vh-70px)] overflow-y-scroll">
          <WithdrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;