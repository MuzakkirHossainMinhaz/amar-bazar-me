import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { deleteUserAddress, loadUser, updatUserAddress, updateUserInformation } from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { IoMdAddCircle } from "react-icons/io";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

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

    axios.put(`${server}/user/update-avatar`, { avatar: imgURL }, { withCredentials: true })
      .then((response) => {
        dispatch(loadUser());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full ml-4 800px:ml-8 pt-1 p-2 pr-0 rounded-md flex flex-col items-center">
      {/* profile */}
      {
        active === 1 && (
          <>
            <div className="flex justify-center w-full items-center">
              <div className="relative">
                <img
                  src={`${user?.avatar}`}
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt="profile photo"
                />

                <div className="w-9 h-9 bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera size={20} className="cursor-pointer" />
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full 800px:max-w-3xl mt-4">
              <form onSubmit={handleSubmit} className="space-y-4" aria-required={true}>
                <div className="w-full 800px:flex gap-4">
                  <div className="flex-1">
                    <label className="block pb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`${styles.input}`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block pb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className={`${styles.input}`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full 800px:flex gap-4">
                  <div className="flex-1">
                    <label className="block pb-1">Phone Number</label>
                    <input
                      type="number"
                      name="phoneNumber"
                      className={`${styles.input}`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block pb-1">Enter your password</label>
                    <input
                      type="password"
                      name="password"
                      className={`${styles.input}`}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <input
                  className={`${styles.form_button} !mt-6`}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </>
        )
      }

      {/* order */}
      {
        active === 2 && (
          <div className="flex justify-center w-full items-center">
            <AllOrders />
          </div>
        )
      }

      {/* refund */}
      {
        active === 3 && (
          <div className="flex justify-center w-full items-center">
            <AllRefundOrders />
          </div>
        )
      }

      {/* track order */}
      {
        active === 5 && (
          <div className="flex justify-center w-full items-center">
            <TrackOrder />
          </div>
        )
      }

      {/* change Password */}
      {
        active === 6 && (
          <div className="flex justify-center w-full items-center">
            <ChangePassword />
          </div>
        )
      }

      {/*  user address */}
      {
        active === 7 && (
          <div className="flex justify-center w-full items-center">
            <Address />
          </div>
        )
      }
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders && orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.cart.length,
      total: "BDT৳ " + item.totalPrice,
      status: item.status,
    });
  });

  return (
    <div className="w-full bg-white p-2 rounded-md">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  eligibleOrders && eligibleOrders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.cart.length,
      total: "BDT৳ " + item.totalPrice,
      status: item.status,
    });
  });

  return (
    <div className="w-full bg-white p-2 rounded-md">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders && orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.cart.length,
      total: "BDT৳ " + item.totalPrice,
      status: item.status,
    });
  });

  return (
    <div className="w-full bg-white p-2 rounded-md">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios.put(`${server}/user/update-user-password`, { oldPassword, newPassword, confirmPassword }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full 800px:max-w-2xl bg-white p-2 px-5 pb-5 rounded-md">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] py-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col space-y-4 mt-1"
        >
          <div className="flex-1">
            <label className="block pb-1">Enter your old password</label>
            <input
              type="password"
              name="oldPassword"
              className={`${styles.input}`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block pb-1">Enter your new password</label>
            <input
              type="password"
              name="newPassword"
              className={`${styles.input}`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block pb-1">Enter your confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`${styles.input}`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <input
            className={`${styles.form_button} !mt-6`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
    window.location.reload(true);
  };

  return (
    <div className="w-full bg-white px-2 rounded-md">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          My Addresses
        </h1>
        <div className={`${styles.button}`} onClick={() => setOpen(true)}>
          <span className="text-white flex items-center gap-1.5">
            <IoMdAddCircle className="mt-[0.5px]" />
            Add New
          </span>
        </div>
      </div>

      {
        open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
            <div className="w-[85%] md:w-[65%] 1000px:w-[45%] xl:w-[35%] bg-white rounded-md shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1 size={25}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <h1 className="text-center text-[25px]">
                Add New Address
              </h1>

              <div className="w-full">
                <form aria-required onSubmit={handleSubmit} className="w-full">
                  <div className="w-full p-4 flex flex-col gap-3">
                    <div className="w-full">
                      <label className="block">Country</label>
                      <select
                        name="country"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={`${styles.select}`}
                      >
                        <option value="" className="block border pb-1">
                          Choose your country
                        </option>
                        {
                          Country && Country.getAllCountries().map((item) => (
                            <option className="block pb-1" key={item.isoCode} value={item.isoCode} >
                              {item.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="w-full">
                      <label className="block">Choose your City</label>
                      <select
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`${styles.select}`}
                      >
                        <option value="" className="block border pb-1">
                          Choose your city
                        </option>
                        {
                          State && State.getStatesOfCountry(country).map((item, index) => (
                            <option className="block pb-1" key={index} value={item.name}>
                              {item.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="w-full">
                      <label className="block">Address 1</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label className="block">Address 2</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label className="block">Zip Code</label>
                      <input
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label className="block">Address Type</label>
                      <select
                        name="addressType"
                        id="addressType"
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className={`${styles.select}`}
                      >
                        <option value="" className="block border pb-1">
                          Choose your address type
                        </option>
                        {
                          addressTypeData && addressTypeData.map((item) => (
                            <option className="block pb-1"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full">
                      <input
                        type="submit"
                        className={`${styles.form_button} !mt-6`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }

      {
        user && user.addresses.map((item, index) => (
          <div className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-2" key={index}>
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[14px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[14px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))
      }

      {
        user && user.addresses.length === 0 && (
          <h5 className="text-center py-8 text-[18px] font-medium">
            You have not any saved address!
          </h5>
        )
      }
    </div>
  );
};

export default ProfileContent;