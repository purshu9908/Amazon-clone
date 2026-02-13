import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import customParseFormat from "https://unpkg.com/dayjs@1.11.10/esm/plugin/customParseFormat/index.js";

dayjs.extend(customParseFormat);

function renderTracking() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const productId = params.get("productId");
  const order = orders.find((order) => order.id === orderId);
  if (!order) {
    return;
  }
  const orderItem = order.items.find((item) => item.id === productId);
  if (!orderItem) {
    return;
  }
  const product = getProduct(productId);
  if (!product) {
    return;
  }
  const today = dayjs();
  const currentYear = today.year();
  let orderDate = dayjs(`${order.orderTime} ${currentYear}`, "MMMM D YYYY");
  if (orderDate.isAfter(today)) {
    orderDate = orderDate.subtract(1, "year");
  }
  const deliveryDateString = orderItem.estimatedDeliveryDate.includes(",")
    ? orderItem.estimatedDeliveryDate.split(",")[1].trim()
    : orderItem.estimatedDeliveryDate;
  let deliveryDate = dayjs(
    `${deliveryDateString} ${currentYear}`,
    "MMMM D YYYY",
  );
  if (deliveryDate.isBefore(orderDate)) {
    deliveryDate = deliveryDate.add(1, "year");
  }
  const totalDuration = deliveryDate.diff(orderDate);
  const elapsed = today.diff(orderDate);
  let progressPercent = (elapsed / totalDuration) * 100;
  progressPercent = Math.min(Math.max(progressPercent, 0), 100);
  let stage = "Preparing";
  if (progressPercent >= 50 && progressPercent < 100) {
    stage = "Shipped";
  } else if (progressPercent >= 100) {
    stage = "Delivered";
  }
  const orderItemDetails = `
    <div class="delivery-date">
      Estimated delivery: ${deliveryDate.format("MMMM D")}
    </div>
    <div class="order-product-details">
        <div>${product.name}</div>
        <div>Quantity: ${orderItem.quantity}</div>
        <div>
            <img src="${product.image}" class="order-item-img">
        </div>
        <div>
            <div class="progress-bar-header">
                <div style="color:${stage === "Preparing" ? "rgb(0, 128, 0)" : "black"}">Preparing</div>
                <div style="color:${stage === "Shipped" ? "rgb(0, 128, 0)" : "black"}">Shipped</div>
                <div style="color:${stage === "Delivered" ? "rgb(0, 128, 0)" : "black"}">Delivered</div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-body" style="width:${progressPercent}%"></div>
            </div>
        </div>
    </div>
  `;
  document.querySelector(".order-item-details").innerHTML = orderItemDetails;
}
renderTracking();
