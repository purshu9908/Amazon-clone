import { getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { getDeliveryDate } from "./deliveryOptions.js";
import { moneyCalculator } from "./money.js";
export function renderOrders() {
  let ordersSummaryHTML = "";
  orders.forEach((order) => {
    let ordersBodySummaryHTML = "";
    order.items.forEach((orderItem) => {
      const matchingItem = getProduct(orderItem.id);
      ordersBodySummaryHTML += `
          <div class="order-item">
            <div class="image-container"><img src=${matchingItem.image}
                alt="">
            </div>
            <div class="product-details">
                <div>${matchingItem.name}</div>
                    <div>Arriving on: ${getDeliveryDate(orderItem.deliveryOptionId)}</div>
                    <div>Quantity: ${orderItem.quantity}</div>
                    <button class="buy-again"><img src="images/icons/buy-again.png" alt="">Buy it again</button>
                </div>
            <div>
            <button class="track-package">Track Package</button>
        </div>
    </div>`;
    });
    ordersSummaryHTML += `
              <div class="order">
                  <div class="order-header">
                      <div class="header-left-section">
                          <div>
                              <div class="header-headings">Order Placed :</div>
                              <div>${order.orderTime}</div>
                          </div>
                          <div>
                              <div class="header-headings">Total :</div>
                              <div>$${moneyCalculator(order.orderTotal)}</div>
                          </div>
                      </div>
                      <div class="header-right-section">
                          <div class="header-headings">Order ID :</div>
                          <div>${order.id}</div>
                      </div>
                  </div>
                  <div class="order-body">${ordersBodySummaryHTML}</div>
              </div>
              `;
    document.querySelector(".orders-list").innerHTML = ordersSummaryHTML;
  });
}
renderOrders();
