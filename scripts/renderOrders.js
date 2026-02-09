import { getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { getDeliveryDate } from "./deliveryOptions.js";
import { moneyCalculator } from "./money.js";
import { addToCart } from "../data/cart.js";

export function renderOrders() {
  let ordersSummaryHTML = "";

  if (orders.length === 0) {
    document.querySelector(".orders-list").innerHTML = `
    <div class="empty-orders">
      <p>You haven't placed any orders yet.</p>
      <a href="amazon.html" class="go-to-homepage">Start shopping</a>
    </div>
  `;
    return;
  }

  orders.forEach((order) => {
    let ordersBodySummaryHTML = "";

    order.items.forEach((orderItem) => {
      const matchingItem = getProduct(orderItem.id);
      const deliveryDate =
        orderItem.estimatedDeliveryDate ||
        getDeliveryDate(orderItem.deliveryOptionId);

      ordersBodySummaryHTML += `
          <div class="order-item">
            <div class="image-container">
              <img src="${matchingItem.image}" alt="">
            </div>
            <div class="product-details">
                <div>${matchingItem.name}</div>
                <div>Arriving on: ${deliveryDate}</div>
                <div>Quantity: ${orderItem.quantity}</div>
                <button class="buy-again js-buy-again" 
                  data-product-id="${matchingItem.id}" 
                  data-quantity="${orderItem.quantity}">
                  <img src="images/icons/buy-again.png" alt="">
                  <span class="buy-again-message">Buy it again</span>
                </button>
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
  });

  document.querySelector(".orders-list").innerHTML = ordersSummaryHTML;
}

renderOrders();

document.querySelector(".orders-list").addEventListener("click", (event) => {
  const buyAgainBtn = event.target.closest(".js-buy-again");
  if (buyAgainBtn) {
    const productId = buyAgainBtn.dataset.productId;
    const quantity = Number(buyAgainBtn.dataset.quantity);
    addToCart(productId, quantity);

    const messageSpan = buyAgainBtn.querySelector(".buy-again-message");
    const originalText = messageSpan.innerText;
    messageSpan.innerText = "Added!";

    setTimeout(() => {
      messageSpan.innerText = originalText;
    }, 1000);
  }
});
