import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const products = allProducts.filter((p) => p.shop._id === seller._id);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}/coupon/get-coupon/${seller._id}`, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true }).then((res) => {
      toast.success("Coupon code deleted succesfully!")
    })
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${server}/coupon/create-coupon-code`,
      {
        name,
        minAmount,
        maxAmount,
        selectedProducts,
        value,
        shopId: seller._id,
      },
      { withCredentials: true }
    )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      minWidth: 175,
      flex: 0.7
    },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 150,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "minAmount",
      headerName: "Minimum Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "maxAmount",
      headerName: "Maximum Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  coupons && coupons.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: item.value + " %",
      minAmount: item.minAmount,
      maxAmount: item.maxAmount,
      sold: 10,
    });
  });

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className="w-full m-8 p-2 rounded-md bg-white">
            <div className="w-full flex justify-end">
              <div className={`${styles.button} !w-max px-5 mb-2 !mt-0`}
                onClick={() => setOpen(true)}
              >
                <span className="text-white flex items-center gap-1.5">
                  <IoMdAddCircle className="mt-[0.5px]" />
                  Create Coupon Code
                </span>
              </div>
            </div>

            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />

            {
              open && (
                <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                  <div className="w-[90%] sm:w-[80%] md:w-[70%] 1000px:w-[50%] xl:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                    <div className="w-full flex justify-end">
                      <RxCross1
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>

                    <h5 className="text-[30px] font-Poppins text-center">
                      Create Coupon Code
                    </h5>

                    {/* create coupoun code */}
                    <form onSubmit={handleSubmit} aria-required={true}>
                      <br />
                      <div>
                        <label className="pb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={name}
                          className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your coupon code name..."
                        />
                      </div>
                      <br />
                      <div>
                        <label className="pb-1">
                          Discount Percentenge (%){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="value"
                          value={value}
                          required
                          className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="Enter your coupon code value..."
                        />
                      </div>
                      <br />
                      <div>
                        <label className="pb-1">Min Amount</label>
                        <input
                          type="number"
                          name="value"
                          value={minAmount}
                          className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
                          onChange={(e) => setMinAmout(e.target.value)}
                          placeholder="Enter your coupon code min amount..."
                        />
                      </div>
                      <br />
                      <div>
                        <label className="pb-1">Max Amount</label>
                        <input
                          type="number"
                          name="value"
                          value={maxAmount}
                          className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
                          onChange={(e) => setMaxAmount(e.target.value)}
                          placeholder="Enter your coupon code max amount..."
                        />
                      </div>
                      <br />
                      <div>
                        <label className="pb-1">Selected Product</label>
                        <select
                          className="w-full mt-1 border h-[40px] rounded-md px-3"
                          value={selectedProducts}
                          onChange={(e) => setSelectedProducts(e.target.value)}
                        >
                          <option value="Choose your selected products">
                            Choose a selected product
                          </option>
                          {
                            products && products.map((i) => (
                              <option value={i.name} key={i.name}>
                                {i.name}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                      <br />
                      <div>
                        <input
                          type="submit"
                          value="Create"
                          className="mt-2 appearance-none block w-full px-3 h-[40px] border border-blue-400 bg-blue-400 rounded-md placeholder-gray-400 focus:outline-none cursor-pointer focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              )
            }
          </div>
        )}
    </>
  );
};

export default AllCoupons;