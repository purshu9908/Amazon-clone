import { cart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getDeliveryDate } from "../scripts/deliveryOptions.js";

export const orders = JSON.parse(localStorage.getItem("Orders")) || [];

export function addOrder(orderTotal) {
  if (cart.length === 0) return;
  orders.unshift({
    id: crypto.randomUUID(),
    orderTime: dayjs().format("MMMM D"),
    items: cart.map((cartItem) => {
      return {
        ...cartItem,
        estimatedDeliveryDate: getDeliveryDate(cartItem.deliveryOptionId),
      };
    }),
    orderTotal: orderTotal,
  });
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("Orders", JSON.stringify(orders));
}
