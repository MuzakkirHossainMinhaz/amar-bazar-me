import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[calc(100vh-70px)] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center px-4 py-3">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard size={26} color={`${active === 1 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[blue]" : "text-[#555]"}`}>
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4 py-3">
        <Link to="/admin_orders" className="w-full flex items-center">
          <FiShoppingBag size={26} color={`${active === 2 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[blue]" : "text-[#555]"}`}>
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4 py-3">
        <Link to="/admin_users" className="w-full flex items-center">
          <HiOutlineUserGroup size={26} color={`${active === 3 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[blue]" : "text-[#555]"}`}>
            All Users
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4 py-3">
        <Link to="/admin_sellers" className="w-full flex items-center">
          <MdOutlineSell size={26} color={`${active === 4 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[blue]" : "text-[#555]"}`}>
            All Sellers
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4 py-3">
        <Link to="/admin_products" className="w-full flex items-center">
          <BsHandbag size={26} color={`${active === 5 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[blue]" : "text-[#555]"}`}>
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4 py-3">
        <Link to="/admin_events" className="w-full flex items-center">
          <MdOutlineLocalOffer size={26} color={`${active === 6 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 6 ? "text-[blue]" : "text-[#555]"}`}>
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4 py-3">
        <Link to="/admin_withdraw_request" className="w-full flex items-center">
          <CiMoneyBill size={26} color={`${active === 7 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 7 ? "text-[blue]" : "text-[#555]"}`}>
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4 py-3">
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting size={26} color={`${active === 8 ? "blue" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 8 ? "text-[blue]" : "text-[#555]"}`}>
            Settings
          </h5>
        </Link>
      </div>

    </div>
  );
};

export default AdminSideBar;