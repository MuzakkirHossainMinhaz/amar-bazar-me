import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { TbMessage2 } from "react-icons/tb";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));

    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc, product) =>
    acc + product.reviews.reduce((sum, review) => sum + review.rating, 0), 0);

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;

      await axios.post(`${server}/conversation/create-new-conversation`, {
        groupTitle, userId, sellerId
      })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-slate-50">
      {
        data ? (
          <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
            <div className="w-full py-5">
              <div className="block w-full lg:flex gap-8">
                <div className="w-full lg:w-[50%]">
                  <img
                    src={`${data && data.images[select]}`}
                    alt="product image"
                    className="w-full lg:h-[400px] xl:h-[550px] contain rounded-md"
                  />

                  <div className="w-full flex gap-2">
                    {
                      data && data.images.map((i, index) => (
                        <div className={`${select === index ? "border-[4px] rounded-md border-blue-600" : "border-[4px] rounded-md border-slate-50"} cursor-pointer mt-4`}>
                          <img
                            src={`${i}`}
                            alt="product image"
                            className="h-[100px] md:h-[135px] xl:h-[175px] rounded-sm overflow-hidden"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="w-full lg:w-[50%] pt-3">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p className="my-3">{data.description}</p>

                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice} !text-blue-600`}>
                      {data.discountPrice}৳
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? data.originalPrice + "৳" : null}
                    </h3>
                  </div>

                  <div className="flex items-center my-10 justify-between pr-3">
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

                  {/* add to cart button */}
                  <div className={`${styles.button} flex items-center`}
                    onClick={() => addToCartHandler(data._id)}>
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-200 py-1.5 px-4 rounded-md mt-7">
                    <div className="flex gap-2 items-center">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <img
                          src={`${data?.shop?.avatar}`}
                          alt="shop profile"
                          className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                      </Link>
                      <div className="">
                        <Link to={`/shop/preview/${data?.shop._id}`}>
                          <h3 className={`${styles.shop_name}`}>
                            {data.shop.name}
                          </h3>
                        </Link>
                        <h5 className="text-[16px]">
                          ({averageRating}/5) Ratings
                        </h5>
                      </div>
                    </div>
                    <div className={`${styles.button}`} onClick={handleMessageSubmit}>
                      <span className="text-white flex items-center gap-2">
                        Send Message <TbMessage2 className="mt-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProductDetailsInfo
              data={data}
              products={products}
              totalReviewsLength={totalReviewsLength}
              averageRating={averageRating}
            />
            <br />
            <br />
          </div>
        ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-slate-200 px-3 mt-8 lg:mt-5 rounded-md">
      <div className="w-full flex flex-col 800px:flex-row 800px:justify-between border-b py-3">
        <div className="flex-1 text-center">
          <h5 className={`text-[#000] text-[18px] py-2 leading-5 font-[600] cursor-pointer 800px:text-[20px] ${active === 1 && styles.active_indicator}`} onClick={() => setActive(1)}>
            Product Details
          </h5>
        </div>

        <div className="flex-1 text-center">
          <h5 className={`text-[#000] text-[18px] py-2 leading-5 font-[600] cursor-pointer 800px:text-[20px] ${active === 2 && styles.active_indicator}`} onClick={() => setActive(2)}>
            Product Reviews
          </h5>
        </div>

        <div className="flex-1 text-center">
          <h5 className={`text-[#000] text-[18px] py-2 leading-5 font-[600] cursor-pointer 800px:text-[20px] h-[40px] ${active === 3 && styles.active_indicator}`} onClick={() => setActive(3)}>
            Seller Information
          </h5>
        </div>
      </div>

      {
        active === 1 ? (
          <div className="min-h-[21.5vh] w-full">
            <p className="py-2 text-[18px] leading-8 pb-3 whitespace-pre-line">
              {data.description}
            </p>
          </div>
        ) : null
      }

      {
        active === 2 ? (
          <div className="w-full min-h-[21.5vh] flex flex-col items-center py-3 overflow-y-scroll">
            {
              data && data?.reviews?.map((item, index) => (
                <div key={index} className="w-full flex my-2">
                  <img
                    src={`${item.user.avatar}`}
                    alt="profile photo"
                    className="w-[50px] h-[50px] rounded-full"
                  />

                  <div className="pl-2 ">
                    <div className="w-full flex items-center">
                      <h1 className="font-[500] mr-3">{item.user.name}</h1>
                      <Ratings rating={data?.ratings} />
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))
            }

            <div className="w-full flex justify-center">
              {
                data && data?.reviews?.length === 0 && (
                  <h5>No Reviews have for this product!</h5>
                )
              }
            </div>
          </div>
        ) : null
      }

      {
        active === 3 && (
          <div className="w-full flex flex-col gap-5 800px:flex-row p-5">
            <div className="flex-1">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="flex items-center gap-2">
                  <img
                    src={`${data?.shop?.avatar}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt="shop photo"
                  />
                  <div className="">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="text-[16px] mt-[-3px]">({averageRating}/5) Ratings</h5>
                  </div>
                </div>
              </Link>
              <p className="pt-2.5">{data.shop.description}</p>
            </div>

            <div className="flex-1 mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:{" "}
                  <span className="font-[500]">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600] pt-2">
                  Total Products:{" "}
                  <span className="font-[500]">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-[600] pt-2">
                  Total Reviews:{" "}
                  <span className="font-[500]">{totalReviewsLength}</span>
                </h5>
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <div className={`${styles.button}`}>
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ProductDetails;
