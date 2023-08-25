import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <Header />

            <div className={`${styles.section} flex bg-[#f5f5f5] py-4`}>
              <div className="w-[60px] 800px:w-[270px] sticky h-[calc(100vh-195px)] overflow-y-scroll">
                <ProfileSideBar active={active} setActive={setActive} />
              </div>

              <div className="w-[calc(100%-65px)] 800px:w-[calc(100%-270px)] justify-center flex h-[calc(100vh-195px)] overflow-y-scroll">
                <ProfileContent active={active} />
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default ProfilePage;
