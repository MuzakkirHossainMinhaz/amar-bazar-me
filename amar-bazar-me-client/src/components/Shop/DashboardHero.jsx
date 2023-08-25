import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const availableBalance = seller?.availableBalance.toFixed(2);

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
      field: "",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
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
      itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
      total: "BDT৳ " + item.totalPrice,
      status: item.status,
    });
  });

  return (
    <div className="w-full px-8 py-5">
      <h3 className="text-[24px] pb-2">Overview</h3>

      <div className="w-full flex flex-col gap-2 lg:flex-row">
        <div className="flex-1 bg-white shadow rounded p-4">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={27} className="mr-2" fill="#00000085" />
            <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              Account Balance{" "}
              <span className="text-[14px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[30px] font-[600] text-green-600">${availableBalance}</h5>
          <Link to="/dashboard_withdraw_money">
            <h5 className="pt-4 pl-[2] text-[#077f9c] hover:underline">Withdraw Money</h5>
          </Link>
        </div>

        <div className="flex-1 bg-white shadow rounded p-4">
          <div className="flex items-center">
            <MdBorderClear size={27} className="mr-2" fill="#00000085" />
            <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[30px] font-[600] text-cyan-600">{orders && orders.length}</h5>
          <Link to="/dashboard_orders">
            <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline">View Orders</h5>
          </Link>
        </div>

        <div className="flex-1 bg-white shadow rounded p-4">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={27} className="mr-2" fill="#00000085" />
            <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[30px] font-[600] text-yellow-600">{products && products.length}</h5>
          <Link to="/dashboard_products">
            <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline">View Products</h5>
          </Link>
        </div>
      </div>

      <br />
      <h3 className="text-[22px] mt-3 pb-2">Latest Orders</h3>
      <div className="w-full bg-white rounded-md">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 15]}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;