import React from 'react';
import styles from '../../styles/styles';
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex gap-8 flex-col md:flex-row py-10 justify-between">
        <div className="w-full md:w-[45%] lg:w-[35%] xl:w-[25%] bg-white rounded-md shadow-sm overflow-y-scroll h-[90vh] md:sticky top-10 left-0 z-10 p-4">
          <ShopInfo isOwner={true} />
        </div>

        <div className="w-full md:w-[54%] lg:w-[64%] xl:w-[74%] rounded-md">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;