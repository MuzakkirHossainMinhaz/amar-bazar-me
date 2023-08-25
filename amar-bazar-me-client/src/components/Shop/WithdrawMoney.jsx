import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { BiMoney } from "react-icons/bi";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    setPaymentMethod(false);

    await axios.put(`${server}/shop/update-payment-methods`, { withdrawMethod }, { withCredentials: true })
      .then((res) => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios.delete(`${server}/shop/delete-withdraw-method`, { withCredentials: true })
      .then((res) => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      });
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      const amount = withdrawAmount;
      await axios.post(`${server}/withdraw/create-withdraw-request`, { amount }, { withCredentials: true })
        .then((res) => {
          toast.success("Withdraw money request is successful!");
          window.location.reload(true);
        });
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-full m-7 p-2 overflow-y-scroll">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div className={`${styles.button} text-white flex items-center gap-2`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          <BiMoney className="w-6 h-6" /> Withdraw
        </div>
      </div>

      {
        open && (
          <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
            <div className={`w-[95%] 800px:w-[50%] bg-white shadow rounded-md ${paymentMethod ? "overflow-y-scroll" : "h-[unset]"} min-h-[40vh] pt-3 px-4 pb-5`}>
              <div className="w-full flex justify-end relative">
                <RxCross1 size={25}
                  onClick={() => setOpen(false) || setPaymentMethod(false)}
                  className="absolute cursor-pointer"
                />
              </div>

              {
                paymentMethod ? (
                  <div>
                    <h3 className="text-[22px] text-center py-2 font-semibold">
                      Add new Withdraw Method:
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label>
                          Bank Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={bankInfo.bankName}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                          id="name"
                          placeholder="Enter your Bank name!"
                          className={`${styles.input}`}
                        />
                      </div>

                      <div>
                        <label>
                          Bank Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name=""
                          value={bankInfo.bankCountry}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankCountry: e.target.value,
                            })
                          }
                          id=""
                          required
                          placeholder="Enter your Bank Country!"
                          className={`${styles.input}`}
                        />
                      </div>

                      <div>
                        <label>
                          Bank Swift Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name=""
                          id=""
                          required
                          value={bankInfo.bankSwiftCode}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankSwiftCode: e.target.value,
                            })
                          }
                          placeholder="Enter your Bank Swift Code!"
                          className={`${styles.input}`}
                        />
                      </div>

                      <div>
                        <label>
                          Bank Account Number{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name=""
                          id=""
                          value={bankInfo.bankAccountNumber}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankAccountNumber: e.target.value })}
                          required
                          placeholder="Enter your Bank Account Number!"
                          className={`${styles.input}`}
                        />
                      </div>

                      <div>
                        <label>
                          Bank Holder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name=""
                          required
                          value={bankInfo.bankHolderName}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankHolderName: e.target.value })}
                          id=""
                          placeholder="Enter your Bank Holder Name!"
                          className={`${styles.input}`}
                        />
                      </div>

                      <div>
                        <label>
                          Bank Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name=""
                          required
                          id=""
                          value={bankInfo.bankAddress}
                          onChange={(e) => setBankInfo({ ...bankInfo, bankAddress: e.target.value })}
                          placeholder="Enter your Bank Address!"
                          className={`${styles.input}`}
                        />
                      </div>

                      <button type="submit" className={`${styles.button} text-white w-full !mt-8`}>
                        Add
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    <h3 className="text-[22px] font-semibold">
                      Available Withdraw Methods:
                    </h3>

                    {
                      seller && seller?.withdrawMethod ? (
                        <div>
                          <div className="800px:flex w-full justify-between items-center py-4">
                            <div className="800px:w-[50%]">
                              <h5>
                                Account Number:{" "}
                                {"*".repeat(seller?.withdrawMethod.bankAccountNumber.length - 3) + seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                              </h5>
                              <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                            </div>

                            <div className="800px:w-[50%]">
                              <AiOutlineDelete
                                size={25}
                                className="cursor-pointer"
                                onClick={() => deleteHandler()}
                              />
                            </div>
                          </div>
                          
                          <h4>Available Balance: {availableBalance}$</h4>

                          <div className="800px:flex w-full items-center gap-2 mt-4">
                            <input
                              type="number"
                              placeholder="Amount..."
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                              className={`${styles.input}`}
                            />
                            <div className={`${styles.button} !h-[40px] text-white`} onClick={withdrawHandler}>
                              Withdraw
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[18px] py-3 text-gray-600">
                            No Withdraw Methods available!
                          </p>

                          <div className="w-full flex items-center">
                            <div className={`${styles.button} text-[#fff] w-fit px-5`}
                              onClick={() => setPaymentMethod(true)}
                            >
                              Add New Method
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default WithdrawMoney;