import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "./deliveryOptions.js";
import { moneyCalculator } from "./money.js";
export let orderTotal = 0;
export function renderPaymentSummary() {
  let itemsCost = 0,
    shippingCost = 0,
    totalBeforeTax = 0,
    estimatedTax = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    itemsCost += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingCost += deliveryOption.priceCents;
  });
  totalBeforeTax = itemsCost + shippingCost;
  estimatedTax = Math.round(totalBeforeTax * 0.1);
  orderTotal = totalBeforeTax + estimatedTax;
  document.querySelector(".js-cart-total").innerText = cart.length;
  document.querySelector(".js-item-total").innerText =
    moneyCalculator(itemsCost);
  document.querySelector(".js-shipping-total").innerText =
    moneyCalculator(shippingCost);
  document.querySelector(".js-total-before-tax").innerText =
    moneyCalculator(totalBeforeTax);
  document.querySelector(".js-total-tax").innerText =
    moneyCalculator(estimatedTax);
  document.querySelector(".js-order-total").innerText =
    moneyCalculator(orderTotal);
}
