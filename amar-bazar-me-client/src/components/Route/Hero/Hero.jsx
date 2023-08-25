import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {AiOutlineShoppingCart} from 'react-icons/ai';

const Hero = () => {
  return (
    <div
      className={`relative min-h-[60vh] 800px:min-h-[70vh] bg-cover w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{ backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)" }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[75%]`}>
        <h1 className={`text-[35px] leading-[1.1] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
          Best Collection for<br />Home Decoration
        </h1>

        <p className="py-7 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>

        <Link to="/products" className="inline-block">
          <div className={`${styles.button}`}>
            <span className="text-white text-[18px] flex gap-2 items-center">
              <AiOutlineShoppingCart /> Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
