import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopRegister from "../components/Shop/ShopRegister";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    };
  }, []);

  return (
    <div>
      <ShopRegister />
    </div>
  );
};

export default ShopCreatePage;