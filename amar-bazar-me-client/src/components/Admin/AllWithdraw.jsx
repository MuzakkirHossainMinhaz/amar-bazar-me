import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@material-ui/data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState('Processing');

  useEffect(() => {
    axios.get(`${server}/withdraw/get-all-withdraw-request`, { withCredentials: true })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Withdraw Id",
      minWidth: 150,
      flex: 0.7
    },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Request given at",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {

        return (
          <BsPencil
            size={20}
            className={`${params.row.status !== "Processing" ? 'hidden' : ''} mr-5 cursor-pointer`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const handleSubmit = async () => {
    await axios.put(`${server}/withdraw/update-withdraw-request/${withdrawData.id}`, {
      sellerId: withdrawData.shopId,
    }, { withCredentials: true })
      .then((res) => {
        toast.success("Withdraw request updated successfully!");
        setData(res.data.withdraws);
        setOpen(false);
      });
  };

  const row = [];
  data && data.forEach((item) => {
    row.push({
      id: item._id,
      shopId: item.seller._id,
      name: item.seller.name,
      amount: "BDT৳ " + item.amount,
      status: item.status,
      createdAt: item.createdAt.slice(0, 10),
    });
  });

  return (
    <div className="w-full px-8 py-5">
      <h3 className="text-[24px] pb-3">All Withdraws Request</h3>

      <div className="w-full bg-white rounded-md">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 14]}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      {
        open && (
          <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
            <div className="w-[90%] md:w-[50%] lg:w-[35%] pb-8 bg-white rounded shadow p-4">
              <div className="flex justify-end w-full cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h1 className="text-[28px] font-medium text-center">
                Update Withdraw Status
              </h1>
              <br />
              <div className="flex items-center flex-col gap-1">
                <select
                  name=""
                  id=""
                  onChange={(e) => setWithdrawStatus(e.target.value)}
                  className={`${styles.select} !w-72`}
                >
                  <option value={withdrawStatus}>{withdrawData.status}</option>
                  <option value={withdrawStatus}>Succeed</option>
                </select>
                <button
                  type="submit"
                  className={`block ${styles.button} text-white !h-[42px] w-72`}
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default AllWithdraw;