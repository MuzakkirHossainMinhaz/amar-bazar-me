import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[85%] 800px:w-[60%] 1000px:w-[40%] xl:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {
          wishlist && wishlist.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-4 pr-4 fixed top-1 right-1">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <h5>Wishlist Items is empty!</h5>
            </div>
          ) : (
            <>
              <div>
                <div className="flex w-full justify-end pt-4 pr-4">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenWishlist(false)}
                  />
                </div>

                {/* Item length */}
                <div className={`${styles.noramlFlex} p-4`}>
                  <AiOutlineHeart size={25} className="mt-1" />

                  <h5 className="pl-2 text-[20px] font-[500]">
                    {wishlist && wishlist.length} items
                  </h5>
                </div>

                {/* cart Single Items */}
                <div className="w-full border-t">
                  {
                    wishlist && wishlist.map((i, index) => (
                      <CartSingle
                        key={index}
                        data={i}
                        removeFromWishlistHandler={removeFromWishlistHandler}
                        addToCartHandler={addToCartHandler}
                      />
                    ))
                  }
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center gap-4 relative">
        <RxCross1 className="cursor-pointer"
          onClick={() => removeFromWishlistHandler(data)}
        />

        <img
          src={`${data?.images[0]}`}
          alt="product image"
          className="w-[130px] h-min rounded-md"
        />

        <div className="">
          <h1 className="text-[18px] font-semibold">{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-blue-600">
            BDT৳ {totalPrice}
          </h4>
        </div>

        <div>
          <BsCartPlus size={23} className="cursor-pointer absolute top-9 right-5" tile="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
