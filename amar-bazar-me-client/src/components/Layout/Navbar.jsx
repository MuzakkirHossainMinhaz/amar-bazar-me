import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../static/data';
import styles from '../../styles/styles';

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {
        navItems && navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link to={i.url} className={`${active === index + 1 ? "800px:underline text-yellow-100 font-bold text-xl" : "text-black 800px:text-white"} pb-[30px] 800px:pb-0 px-6 cursor-pointer font-semibold} text-lg`}>
              {i.title}
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default Navbar;