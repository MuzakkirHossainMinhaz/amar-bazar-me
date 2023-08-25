import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../assests/animations/107043-success.json";
import styles from "../styles/styles";
import { Link, useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { server } from "../server";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get('transactionId');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${server}/order/get-order-by-transaction/${transactionId}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [transactionId]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  let totalPrice = 0;

  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍!
      </h5>
      {
        transactionId && <div className="flex justify-center">
          <div
            onClick={() => setOpen(true)}
            className={`${styles.button} px-8 w-fit font-medium text-white`}
          >
            Order Summary
          </div>
        </div>
      }
      <br />
      <br />

      {
        open &&
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[95%] lg:w-[85%] bg-white rounded-md shadow relative overflow-y-scroll pb-10">
            <div className="w-full flex justify-end p-3 print:hidden">
              <RxCross1 size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="flex flex-col items-center">
              <div className="flex justify-between w-full px-10">
                <div className="w-48">
                  <Link to="/">
                    <img src="https://i.ibb.co/82WPRY7/Amar-Bazar.png" alt="AmarBazar Logo" />
                  </Link>
                </div>
                <h2 className="text-[27px] font-semibold text-right text-gray-400">Order Summury</h2>
              </div>

              <div className="mt-4">
                <h2 className="text-green-500 text-2xl font-medium">Congratulations! Payment Successfull.</h2>
              </div>

              <div className="flex items-center justify-between pt-4 w-full px-10">
                <h5 className="text-[#00000084]">
                  Transaction ID: <span className="font-semibold">#{transactionId}</span>
                </h5>
                <h5 className="text-[#00000084]">
                  Payment on: <span className="font-semibold">{orders[0]?.paymentInfo?.paidAt.slice(0, 10)}</span>
                </h5>
              </div>

              <div className="mt-10 w-full px-20">
                {
                  orders && orders?.map((order, index) => {
                    return (
                      <>
                        {
                          order && order?.cart?.map((item, index) => {
                            return (
                              <div className="w-full flex items-center gap-4 mb-5" key={index}>
                                <img
                                  src={`${item.images[0]}`}
                                  alt="product photo"
                                  className="w-[80x] h-[80px] rounded-md"
                                />
                                <div className="w-full">
                                  <h5 className="text-[20px] font-semibold">{item.name}</h5>
                                  <h5 className="text-[20px] text-[#00000091]">
                                    BDT৳ {item.discountPrice} x {item.qty}
                                  </h5>
                                </div>
                                <span className="hidden">{totalPrice += item.discountPrice}</span>
                              </div>
                            )
                          })
                        }
                      </>
                    )
                  })
                }
              </div>
              <div className="border-t w-full text-right px-20">
                <h5 className="pt-3 text-[18px]">
                  Total Price: <strong>BDT৳ {totalPrice}</strong>
                </h5>
              </div>

              <div className="w-full flex justify-center mt-10 print:hidden" onClick={() => window.print()}>
                <p className={`${styles.button} text-white`}>Print</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default OrderSuccessPage;