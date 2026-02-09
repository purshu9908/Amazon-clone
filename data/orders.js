import { cart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const orders = JSON.parse(localStorage.getItem("Orders")) || [];
export function addOrder(orderTotal) {
  orders.unshift({
    id: crypto.randomUUID(),
    orderTime: dayjs().format("MMMM D"),
    items: structuredClone(cart),
    orderTotal: orderTotal,
  });
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("Orders", JSON.stringify(orders));
}
