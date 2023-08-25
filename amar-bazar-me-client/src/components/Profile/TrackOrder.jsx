import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {
          data && data?.status === "Processing" ? (
            <h1 className="text-[20px]">Your order is processing in shop.</h1>
          ) : data?.status === "Transferred to delivery partner" ? (
            <h1 className="text-[20px]">Your order is on the way for delivery partner.</h1>
          ) : data?.status === "Shipping" ? (
            <h1 className="text-[20px]">Your order is on the way with our delivery partner.</h1>
          ) : data?.status === "Received" ? (
            <h1 className="text-[20px]">Your order is in your city. Our delivery man will deliver it.</h1>
          ) : data?.status === "On the way" ? (
            <h1 className="text-[20px]">Our delivery man is going to deliver your order.</h1>
          ) : data?.status === "Delivered" ? (
            <h1 className="text-[20px]">Your order is delivered!</h1>
          ) : data?.status === "Processing refund" ? (
            <h1 className="text-[20px]">Your refund is processing!</h1>
          ) : data?.status === "Refund Success" ? (
            <h1 className="text-[20px]">Your refund is success!</h1>
          ) : null
        }
      </>
    </div>
  );
};

export default TrackOrder;