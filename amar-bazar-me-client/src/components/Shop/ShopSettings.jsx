import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const image = new FormData();
    image.append('image', e.target.files[0]);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_STORAGE_KEY}`;
    const response = await fetch(
      url,
      { method: "post", body: image }
    );
    const imgData = await response.json();
    const imgURL = imgData.data.url.toString();

    setAvatar(imgURL);

    axios.put(`${server}/shop/update-shop-avatar`, { avatar: imgURL }, { withCredentials: true })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios.put(`${server}/shop/update-seller-info`,
      {
        name,
        address,
        zipCode,
        phoneNumber,
        description,
      },
      { withCredentials: true }
    )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full m-8 p-2 rounded-md flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar ? avatar : `${seller.avatar}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full"
            />
            <div className="w-[40px] h-[40px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-1.5 right-3">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image" className="cursor-pointer">
                <AiOutlineCamera size={21} />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center space-y-4"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[70%] xl:w-[50%] mt-5">
            <div className="w-full">
              <label className="block pb-1">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input}`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[70%] xl:w-[50%] mt-5">
            <div className="w-full">
              <label className="block pb-1">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${seller?.description
                ? seller.description
                : "Enter your shop description"
                }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[70%] xl:w-[50%] mt-5">
            <div className="w-full">
              <label className="block pb-1">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input}`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[70%] xl:w-[50%] mt-5">
            <div className="w-full">
              <label className="block pb-1">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input}`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[70%] xl:w-[50%] mt-5">
            <div className="w-full">
              <label className="block pb-1">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input}`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[70%] xl:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`mt - 2 cursor-pointer appearance-none text-center block w-full px-3 h-[40px] border border-gray-300 rounded-md bg-blue-400 hover:bg-blue-500 placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-base`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
