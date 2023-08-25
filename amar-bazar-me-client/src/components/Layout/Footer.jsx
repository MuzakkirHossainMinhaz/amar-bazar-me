import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { Link } from "react-router-dom";
import { footerCompanyLinks, footerProductLinks, footerSupportLinks } from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      {/* subscribe */}
      <div className="md:flex md:justify-between md:items-center px-4 sm:px-12 bg-blue-400 py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-yellow-300 font-bold">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 w-full py-2.5 rounded px-4 focus:outline-none"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 duration-300 px-5 py-2.5 rounded text-slate-600 hover:text-slate-100 md:w-auto w-full font-semibold">
            Submit
          </button>
        </div>
      </div>

      {/* footer part */}
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://i.ibb.co/82WPRY7/Amar-Bazar.png"
            alt=""
            className="w-44"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <br />
          <p>The home and elements needed to create beatiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {
            footerProductLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))
          }
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {
            footerCompanyLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))
          }
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {
            footerSupportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-10 pt-2 px-12 text-gray-400 text-sm pb-8">
        <div className="flex flex-col flex-1 text-center lg:text-right">
          <span>© 2023 AmarBazar. All rights reserved.</span>
          <span>Terms · Privacy Policy</span>
        </div>
        <div className="w-full flex-1">
          <img
            src="https://i.ibb.co/9VhDnLp/ssl.png"
            alt=""
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
