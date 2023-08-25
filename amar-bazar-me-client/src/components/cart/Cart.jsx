import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[85%] 800px:w-[60%] 1000px:w-[40%] xl:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {
          cart && cart.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-4 pr-4 fixed top-1 right-1">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <h5>Cart Items is empty!</h5>
            </div>
          ) : (
            <>
              <div>
                <div className="flex w-full justify-end pt-4 pr-4">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenCart(false)}
                  />
                </div>

                {/* Item length */}
                <div className={`${styles.noramlFlex} p-4`}>
                  <IoBagHandleOutline size={25} />
                  
                  <h5 className="pl-2 text-[20px] font-[500]">
                    {cart && cart.length} items
                  </h5>
                </div>

                {/* cart Single Items */}
                <div className="w-full border-t">
                  {
                    cart && cart.map((i, index) => (
                      <CartSingle
                        key={index}
                        data={i}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    ))
                  }
                </div>
              </div>

              <div className="px-5 mb-3">
                {/* checkout buttons */}
                <Link to="/checkout">
                  <div className={`${styles.button} !w-full`}>
                    <h1 className="text-[#fff] text-[18px] font-[600]">
                      Checkout Now (BDT৳ {totalPrice})
                    </h1>
                  </div>
                </Link>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className={`bg-blue-500 border border-blue-600 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="white" />
          </div>
          <span className="">{data.qty}</span>
          <div className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.images[0]}`}
          alt="product image"
          className="w-[130px] h-min rounded-md"
        />
        <div className="">
          <h1 className="font-semibold text-[18px]">{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ৳{data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-blue-600">
            BDT৳ {totalPrice}
          </h4>
        </div>
        <RxCross1
          size={23}
          className="cursor-pointer absolute right-5"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;