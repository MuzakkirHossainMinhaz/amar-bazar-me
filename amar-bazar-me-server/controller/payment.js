const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SSLCommerzPayment = require('sslcommerz-lts');
const Order = require("../model/order");

router.post("/ssl-payment", catchAsyncErrors(async (req, res, next) => {
  const order = req.body;

  const is_live = false;

  const transactionId = order.paymentInfo.trxId;

  const data = {
    total_amount: order.totalPrice,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `${process.env.BACKEND_URL}/order/update-payment-info?trxId=${transactionId}`,
    fail_url: `${process.env.BACKEND_URL}/order/fail-payment?trxId=${transactionId}`,
    cancel_url: `${process.env.BACKEND_URL}/order/cancel-payment?trxId=${transactionId}`,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: order.shippingAddress.shippingMethod,
    product_name: order.cart[0].name,
    product_category: order.cart[0].category,
    product_profile: 'general',
    cus_name: order.user.name,
    cus_email: order.user.email,
    cus_add1: order.shippingAddress.address1,
    cus_add2: order.shippingAddress.address2,
    cus_city: order.shippingAddress.city,
    cus_state: order.shippingAddress.city,
    cus_postcode: order.shippingAddress.zipCode,
    cus_country: order.shippingAddress.country,
    cus_phone: order.user.phoneNumber,
    cus_fax: '',
    ship_name: order.user.name,
    ship_add1: order.shippingAddress.address1,
    ship_add2: order.shippingAddress.address2,
    ship_city: order.shippingAddress.city,
    ship_state: order.shippingAddress.city,
    ship_postcode: order.shippingAddress.zipCode,
    ship_country: order.shippingAddress.country,
  };

  const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_KEY, is_live)
  sslcz.init(data).then(async (apiResponse) => {
    {
      const { cart, shippingAddress, user, paymentInfo } = order;

      // group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      for (const [shopId, items] of shopItemsMap) {
        let price = 0;
        items.map((item, index) => price += item.discountPrice);

        await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice: price,
          paymentInfo,
        });
      }
    }
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
  });
}));

module.exports = router;