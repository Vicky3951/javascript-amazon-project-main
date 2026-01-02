import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutSummary } from "./checkout/checkoutHeader.js";
import "../data/cart-oop.js";

renderCheckoutSummary();
renderOrderSummary();
renderPaymentSummary();
