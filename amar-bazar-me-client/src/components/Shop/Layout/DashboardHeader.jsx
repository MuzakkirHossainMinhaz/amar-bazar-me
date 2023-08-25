import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[70px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="w-48">
        <Link to="/dashboard">
          <img src="https://i.ibb.co/82WPRY7/Amar-Bazar.png" alt="AmarBazar Logo" />
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard_coupons" className="800px:block hidden">
            <AiOutlineGift color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link>

          <Link to="/dashboard_events" className="800px:block hidden">
            <MdOutlineLocalOffer color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link>

          <Link to="/dashboard_orders" className="800px:block hidden">
            <FiShoppingBag color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link>

          <Link to="/dashboard_products" className="800px:block hidden">
            <FiPackage color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link>

          <Link to="/dashboard_messages" className="800px:block hidden">
            <BiMessageSquareDetail color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link>

          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar}`}
              alt="shop profile"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;