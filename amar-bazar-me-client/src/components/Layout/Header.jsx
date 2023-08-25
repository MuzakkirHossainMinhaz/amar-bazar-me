import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div className="w-48">
            <Link to="/">
              <img src="https://i.ibb.co/82WPRY7/Amar-Bazar.png" alt="AmarBazar Logo" />
            </Link>
          </div>

          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-6 border-blue-400 border-[2px] rounded-full"
            />
            <AiOutlineSearch
              size={26}
              className="absolute right-3 top-1.5 cursor-pointer"
            />

            {
              searchTerm.length !== 0 &&
                searchData && searchData.length !== 0 ? (
                <div className="absolute bg-slate-50 w-full shadow-sm-2 z-[9] p-4 rounded">
                  {
                    searchData && searchData.map((i, index) => {
                      return (
                        <Link key={index} to={`/product/${i._id}`}>
                          <div className="w-full flex items-center">
                            <img
                              src={`${i.images[0]}`}
                              alt=""
                              className="w-9 h-9 mr-3 rounded"
                            />
                            <h1 className="text-[18px]">{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })
                  }
                </div>
              ) : null
            }
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/register_shop"}`}>
              <h1 className="text-white flex items-center font-semibold text-lg">
                {
                  isSeller ? "Dashboard" : "Become Seller"
                }
                {" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-blue-400 h-[70px]`}>
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={23} className="absolute top-[17px] left-2" />
              <button className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}>
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-3 top-[19px] cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {
                dropDown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null
              }
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            {/* wishlist icon */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-yellow-200 w-4 h-4 top right p-0 m-0 text-blue-800 font-mono text-[12px] leading-tight text-center flex justify-center items-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            {/* cart icon */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-yellow-200 w-4 h-4 top right p-0 m-0 text-blue-800 font-mono text-[12px] leading-tight text-center flex justify-center items-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            {/* profile photo */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {
                  isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={`${user?.avatar}`}
                        className="w-10 h-10 rounded-full"
                        alt="profile photo"
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  )}
              </div>
            </div>

            {/* cart popup */}
            {
              openCart ? <Cart setOpenCart={setOpenCart} /> : null
            }

            {/* wishlist popup */}
            {
              openWishlist ? (<Wishlist setOpenWishlist={setOpenWishlist} />) : null
            }
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
        <div className="w-full flex justify-between items-center pt-3">
          <div>
            <BiMenuAltLeft
              size={30}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>

          {/* logo */}
          <div className="w-48">
            <Link to="/">
              <img
                src="https://i.ibb.co/82WPRY7/Amar-Bazar.png"
                alt="AmarBazar Logo"
                className="cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <div className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-yellow-200 w-4 h-4 top right p-0 m-0 text-blue-800 font-mono text-[12px] leading-tight text-center flex justify-center items-center">
                {cart && cart.length}
              </span>
            </div>
          </div>

          {/* cart popup */}
          {
            openCart ? <Cart setOpenCart={setOpenCart} /> : null
          }

          {/* wishlist popup */}
          {
            openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null
          }
        </div>

        {/* header sidebar */}
        {
          open && (
            <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
              <div className="fixed w-[70%] bg-blue-300 h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-between flex pr-3">
                  <div>
                    <div className="relative mr-[15px]"
                      onClick={() => setOpenWishlist(true) || setOpen(false)}
                    >
                      <AiOutlineHeart size={30} className="mt-5 ml-3 text-white" />
                      <span className="absolute right-0 top-0 rounded-full bg-yellow-200 w-4 h-4 top right p-0 m-0 text-blue-800 font-mono text-[12px] leading-tight text-center flex justify-center items-center">
                        {wishlist && wishlist.length}
                      </span>
                    </div>
                  </div>
                  <RxCross1
                    size={26}
                    className="ml-4 mt-5 text-white cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <div className="my-8 w-[95%] m-auto h-[40px relative]">
                  <input
                    type="search"
                    placeholder="Search Product..."
                    className="h-[40px] w-full px-4 border-blue-400 border-[2px] rounded-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {
                    searchTerm.length !== 0 &&
                    searchData && (
                      <div className="absolute bg-white z-10 shadow w-full left-0 p-3">
                        {
                          searchData.map((i) => {
                            const d = i.name;

                            const Product_name = d.replace(/\s+/g, "-");

                            return (
                              <Link to={`/product/${Product_name}`}>
                                <div className="flex items-center">
                                  <img
                                    src={i.image_Url[0]?.url}
                                    alt="product image"
                                    className="w-[50px] mr-2"
                                  />

                                  <h5>{i.name}</h5>
                                </div>
                              </Link>
                            );
                          })
                        }
                      </div>
                    )
                  }
                </div>

                <Navbar active={activeHeading} />

                <div className={`${styles.button} ml-4`}>
                  <Link to={`${isSeller ? "/dashboard" : "/register_shop"}`}>
                    <h1 className="text-white flex items-center font-semibold text-lg">
                      {
                        isSeller ? "Dashboard" : "Become Seller"
                      }
                      {" "}
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
                <br />
                <br />
                <br />

                <div className="flex w-full justify-center">
                  {
                    isAuthenticated ? (
                      <div>
                        <Link to="/profile">
                          <img
                            src={`${user.avatar}`}
                            alt="profile photo"
                            className="w-[60px] h-[60px] rounded-full border-[2px] border-blue-400"
                          />
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="hover:text-white text-[18px] pr-[10px] text-[#000000b7]"
                        >
                          Login
                        </Link>
                        /&nbsp;&nbsp;
                        <Link
                          to="/register"
                          className="hover:text-white text-[18px] text-[#000000b7]"
                        >
                          Register
                        </Link>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Header;
