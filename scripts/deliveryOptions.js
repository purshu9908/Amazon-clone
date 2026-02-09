import { cart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 10,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 4,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 2,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  return deliveryOptions.find((option) => option.id === deliveryOptionId);
}
export function updateDeliveryOptions(productId, deliveryOptionId) {
  let cartItem = cart.find((item) => item.id === productId);
  cartItem.deliveryOptionId = deliveryOptionId;
  const date = getDeliveryDate(deliveryOptionId);
  document.querySelector(`.delivery-date-${productId}`).innerText =
    `Delivery Date: ${date}`;
}
export function getDeliveryDate(deliveryOptionId) {
  const deliveryOption = getDeliveryOption(deliveryOptionId);
  const date = dayjs()
    .add(deliveryOption.deliveryDays, "day")
    .format("dddd, MMMM D");
  return date;
}
