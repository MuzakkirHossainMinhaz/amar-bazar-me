import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
  RegisterPage,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
  ShopAllCoupons,
} from "./routes/ShopRoutes";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";
import OrderFailedPage from "./pages/OrderFailedPage";
import OrderCanceledPage from "./pages/OrderCanceledPage";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payment" element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        } />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path="/seller/activation/:activation_token" element={<SellerActivationPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        } />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/order/failed" element={<OrderFailedPage />} />
        <Route path="/order/canceled" element={<OrderCanceledPage />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/inbox" element={
          <ProtectedRoute>
            <UserInbox />
          </ProtectedRoute>
        } />
        <Route path="/user/order/:id" element={
          <ProtectedRoute>
            <OrderDetailsPage />
          </ProtectedRoute>
        } />
        <Route path="/user/track/order/:id" element={
          <ProtectedRoute>
            <TrackOrderPage />
          </ProtectedRoute>
        } />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

        {/* shop Routes */}
        <Route path="/register_shop" element={<ShopCreatePage />} />
        <Route path="/shop_login" element={<ShopLoginPage />} />
        <Route path="/shop/:id" element={
          <SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>
        } />
        <Route path="/settings" element={
          <SellerProtectedRoute>
            <ShopSettingsPage />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <SellerProtectedRoute>
            <ShopDashboardPage />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_create_product" element={
          <SellerProtectedRoute>
            <ShopCreateProduct />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_orders" element={
          <SellerProtectedRoute>
            <ShopAllOrders />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_refunds" element={
          <SellerProtectedRoute>
            <ShopAllRefunds />
          </SellerProtectedRoute>
        } />
        <Route path="/order/:id" element={
          <SellerProtectedRoute>
            <ShopOrderDetails />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_products" element={
          <SellerProtectedRoute>
            <ShopAllProducts />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_create_event" element={
          <SellerProtectedRoute>
            <ShopCreateEvents />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_events" element={
          <SellerProtectedRoute>
            <ShopAllEvents />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_coupons" element={
          <SellerProtectedRoute>
            <ShopAllCoupons />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_withdraw_money" element={
          <SellerProtectedRoute>
            <ShopWithDrawMoneyPage />
          </SellerProtectedRoute>
        } />
        <Route path="/dashboard_messages" element={
          <SellerProtectedRoute>
            <ShopInboxPage />
          </SellerProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        } />
        <Route
          path="/admin_users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin_sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin_orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin_products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin_events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin_withdraw_request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;