import React from 'react';
import { AiOutlineGift } from 'react-icons/ai';
// import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings, MdOutlineLocalOffer } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[70px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="w-48">
        <Link to="/admin/dashboard">
          <img src="https://i.ibb.co/82WPRY7/Amar-Bazar.png" alt="AmarBazar Logo" />
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* <Link to="/dashboard_coupons" className="800px:block hidden">
            <AiOutlineGift color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link> */}

          {/* <Link to="/dashboard_events" className="800px:block hidden">
            <MdOutlineLocalOffer color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link> */}

          {/* <Link to="/dashboard_products" className="800px:block hidden">
            <FiShoppingBag color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link> */}

          {/* <Link to="/dashboard_orders" className="800px:block hidden">
            <FiPackage color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link> */}

          {/* <Link to="/dashboard_messages" className="800px:block hidden">
            <BiMessageSquareDetail color="#555" size={25} className="mx-5 cursor-pointer" />
          </Link> */}

          <div className='flex items-center text-base md:text-xl gap-1 bg-blue-400 rounded-md text-white py-1.5 px-2 md:px-4'>
            <MdOutlineAdminPanelSettings size={27} />
            <span className="">Admin Dashboard</span>
          </div>

          <div className='ml-2 md:ml-4'>
            <img
              src={`${user?.avatar}`}
              alt="profile photo"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;