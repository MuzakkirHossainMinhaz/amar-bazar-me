import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = new FormData();
    image.append('image', avatar);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_STORAGE_KEY}`;
    const response = await fetch(
      url,
      { method: "post", body: image }
    );
    const imgData = await response.json();
    const imgURL = imgData.data.url.toString();

    axios.post(`${server}/shop/create_shop`, {
      name,
      email,
      password,
      avatar: imgURL,
      zipCode,
      address,
      phoneNumber,
    })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
        setZipCode("");
        setAddress("");
        setPhoneNumber("");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleFileInputChange = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-3">
      <div className='bg-white sm:mx-auto sm:w-full sm:max-w-xl py-8 px-4 shadow sm:px-10 rounded-lg'>
        <div className="sm:mx-auto sm:w-full sm:max-w-xl flex flex-col items-center">
          <img className='w-28 -mt-14 bg-white p-2 rounded-lg px-6 py-4 shadow' src="https://i.ibb.co/DCM14fs/Amar-Bazar-1.png" alt="logo" />
          <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">Register your shop in AmarBazar.</h2>
        </div>
        
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className='flex justify-center'>
                <div className="mt-3 flex flex-col justify-center items-center">
                  <span className="inline-block h-20 w-20 rounded-full overflow-hidden">
                    {
                      avatar ? (
                        <img
                          src={avatarPreview}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <RxAvatar className="h-20 w-20" />
                      )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="mt-1 cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload shop image</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    name="name"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phone-number"
                    id="phone-number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="address"
                    name="address"
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="zipcode"
                    id="zipcode"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div>
                <button type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-blue-400 hover:bg-blue-500"
                >
                  Register
                </button>
              </div>

              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already registered?</h4>
                <Link to="/shop_login" className="text-blue-600 pl-2">
                  Login to your shop
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopRegister;
