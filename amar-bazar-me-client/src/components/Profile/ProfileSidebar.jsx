import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        navigate("/");
        window.location.reload(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white h-full shadow-sm rounded-md p-4 800px:p-6 text-lg">
      <div className="flex items-center cursor-pointer w-full mt-3 800px:mt-0 mb-8 800px:mb-4"
        onClick={() => setActive(1)}
      >
        <RxPerson size={25} color={active === 1 ? "blue" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-[blue]" : ""} 800px:block hidden`}>
          Profile
        </span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8 800px:mb-4"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={25} color={active === 2 ? "blue" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[blue]" : ""} 800px:block hidden`}>
          Orders
        </span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8 800px:mb-4"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={25} color={active === 3 ? "blue" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[blue]" : ""} 800px:block hidden`}>
          Refunds
        </span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8 800px:mb-4"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={25} color={active === 4 ? "blue" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[blue]" : ""} 800px:block hidden`}>
          Inbox
        </span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8 800px:mb-4"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={25} color={active === 5 ? "blue" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-[blue]" : ""} 800px:block hidden`}>
          Track Order
        </span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8 800px:mb-4"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={25} color={active === 6 ? "blue" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-[blue]" : ""} 800px:block hidden`}>
          Change Password
        </span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8 800px:mb-4"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={25} color={active === 7 ? "blue" : ""} />
        <span className={`pl-3 ${active === 7 ? "text-[blue]" : ""} 800px:block hidden`}>
          Address
        </span>
      </div>

      {
        user && user?.role === "admin" && (
          <Link to="/admin/dashboard">
            <div className="flex items-center cursor-pointer w-full mb-8 800px:mb-4"
              onClick={() => setActive(8)}
            >
              <MdOutlineAdminPanelSettings size={25} color={active === 8 ? "blue" : ""} />
              <span className={`pl-3 ${active === 8 ? "text-[blue]" : ""} 800px:block hidden`}>
                Admin Dashboard
              </span>
            </div>
          </Link>
        )
      }

      <div className="single_item flex items-center cursor-pointer w-full mb-8 800px:mb-4"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={25} color={active === 9 ? "blue" : ""} />
        <span className={`pl-3 ${active === 9 ? "text-[blue]" : ""} 800px:block hidden`}>
          Log out
        </span>
      </div>

    </div>
  );
};

export default ProfileSidebar;