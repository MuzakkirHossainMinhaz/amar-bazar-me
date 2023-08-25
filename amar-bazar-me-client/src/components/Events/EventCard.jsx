import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { AiOutlineArrowRight, AiOutlineShoppingCart } from "react-icons/ai";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2 px-5 lg:px-0 lg:py-5`}>

      <div className="w-full lg:-w[50%] flex justify-center">
        <img className="!rounded-md w-full overflow-hidden object-cover px-5" src={`${data.images[0]}`} alt="product image" />
      </div>

      <div className="w-full lg:[w-50%] flex flex-col justify-center lg:pr-12">
        <h2 className={`${styles.productTitle} !text-5xl`}>{data.name}</h2>
        <p className="my-3 text-xl">{data.description}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[20px] text-[red] pr-3 line-through">
              {data.originalPrice}৳
            </h5>
            <h5 className="font-bold text-[35px] text-green-600">
              {data.discountPrice}৳
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-blue-600">
            {data.sold_out} sold
          </span>
        </div>

        <CountDown data={data} />

        <br />

        <div className="flex items-center mt-2">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-white`}>
              See Details <AiOutlineArrowRight className="ml-2" size={17} />
            </div>
          </Link>
          <div className={`${styles.button} text-white ml-5 gap-2`}
            onClick={() => addToCartHandler(data)}>
            Add to cart <AiOutlineShoppingCart className="mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;