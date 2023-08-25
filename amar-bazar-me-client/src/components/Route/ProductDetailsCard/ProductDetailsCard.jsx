import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => { };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {
        data ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#0303035b] z-40 flex items-center justify-center cursor-default">
            <div className="w-[90%] 800px:w-[75%] 920px:w-[60%] overflow-y-scroll bg-white rounded-md shadow-sm relative p-4">
              <RxCross1 size={30}
                className="absolute w-8 h-8 right-4 top-4 z-50 cursor-pointer bg-white rounded-full p-2"
                onClick={() => setOpen(false)}
              />

              <div className="block w-full lg:flex gap-6">
                <div className="w-full lg:w-[50%]">
                  <img
                    className="rounded"
                    src={`${data.images && data.images[0]}`} alt="product image"
                  />

                  <div className="flex mt-4">
                    <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center">
                      <img
                        src={`${data.shop.avatar && data.shop.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                      <div>
                        <h3 className={`${styles.shop_name}`}>
                          {data.shop.name}
                        </h3>
                        <h5 className="pb-3 text-[15px]">{data?.ratings} Ratings</h5>
                      </div>
                    </Link>
                  </div>

                  {/* <div className="flex justify-between items-center">
                    <div
                      className={`${styles.button}`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center gap-2">
                        Send Message <TbMessage2 className="mt-1" />
                      </span>
                    </div>
                  </div> */}
                </div>

                <div className="w-full lg:w-[50%] mt-4">
                  <h1 className={`${styles.productTitle} text-[20px] 920px:leading-7 leading-8 800px:pr-6`}> {data.name} </h1>

                  <p className="my-3">{data.description}</p>

                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discountPrice}৳
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? data.originalPrice + "৳" : null}
                    </h3>
                  </div>

                  <div className="flex items-center mt-8 justify-between pr-3">
                    <div>
                      <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium inline-block w-14 text-center py-[8px]">
                        {count}
                      </span>
                      <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>

                    <div>
                      {
                        click ? (
                          <AiFillHeart
                            size={30}
                            className="cursor-pointer"
                            onClick={() => removeFromWishlistHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Remove from wishlist"
                          />
                        ) : (
                          <AiOutlineHeart
                            size={30}
                            className="cursor-pointer"
                            onClick={() => addToWishlistHandler(data)}
                            title="Add to wishlist"
                          />
                        )
                      }
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-7 pr-3">
                    <div className={`${styles.button} flex items-center`}
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span className="text-[#fff] flex items-center gap-2">
                        Add to cart <AiOutlineShoppingCart className="mt-0.5" />
                      </span>
                    </div>

                    <h5 className="text-[16px] font-semibold text-blue-700">({data.sold_out}) Sold out</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
    </div>
  );
};

export default ProductDetailsCard;
