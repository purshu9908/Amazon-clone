import { cart, removeFromCart, updateCartItemQuantity } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { updateDeliveryOptions, getDeliveryDate } from "./deliveryOptions.js";
import { renderPaymentSummary, orderTotal } from "./paymentSummary.js";
import { addOrder } from "../data/orders.js";
import { moneyCalculator } from "./money.js";
export function renderCart() {
  let cartSummaryHTML = "";
  if (cart.length === 0) {
    cartSummaryHTML = `
      <div class="cart-empty-msg">Your cart is empty</div>
      <a href="amazon.html" class="go-to-homepage">View Products</a>
    `;
  } else {
    cart.forEach((cartItem) => {
      let matchingProduct = getProduct(cartItem.id);
      cartSummaryHTML += `
    <div class="cart-item">
        <div class="delivery-date delivery-date-${matchingProduct.id}">Delivery Date: ${getDeliveryDate(cartItem.deliveryOptionId)}</div>
        <div>
            <div class="cart-product">
                <img src="${matchingProduct.image}" class="cart-img">
                <div class="cart-product-details">
                    <div>${matchingProduct.name}</div>
                    <div class="price">$${moneyCalculator(matchingProduct.priceCents)}</div>
                    <div>Quantity: <span class="quantity">${cartItem.quantity}</span> <a href="#" class="modify-cart update-link">Update</a><span class="save-quantity" ><input type="number"><a href="#" class="modify-cart save-item-quantity" data-product-id="${matchingProduct.id}">Save</a></span>
                        <a href="#" class="modify-cart delete-link" data-product-id="${matchingProduct.id}">Delete</a>
                    </div>
                </div>
                <div>
                    <div>Choose a delivery option</div>
                    <div class="delivery-options">
                        <input type="radio" data-delivery-option-id="1" name="delivery-date-radio-${matchingProduct.id}" data-product-id="${matchingProduct.id}" ${cartItem.deliveryOptionId === "1" ? "checked" : ""} >
                        <div>
                            <p class="green">${getDeliveryDate("1")}</p>
                            <p class="gray">FREE Shipping</p>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <input type="radio" data-delivery-option-id="2" name="delivery-date-radio-${matchingProduct.id}" data-product-id="${matchingProduct.id}" ${cartItem.deliveryOptionId === "2" ? "checked" : ""}>
                        <div>
                            <p class="green">${getDeliveryDate("2")}</p>
                            <p class="gray">$4.99 - Shipping</p>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <input type="radio" data-delivery-option-id="3" name="delivery-date-radio-${matchingProduct.id}" data-product-id="${matchingProduct.id}" ${cartItem.deliveryOptionId === "3" ? "checked" : ""}>
                        <div>
                            <p class="green">${getDeliveryDate("3")}</p>
                            <p class="gray">$9.99 - Shipping</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    });
  }
  document.querySelector(".items-count").innerText = cart.length;
  document.querySelector(".cart-list").innerHTML = cartSummaryHTML;
  attachEventHandlers();
}

function attachEventHandlers() {
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        updateDeliveryOptions(
          radio.dataset.productId,
          radio.dataset.deliveryOptionId,
        );
        renderPaymentSummary();
      }
    });
  });
  document.querySelectorAll(".update-link").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.target.classList.add("hide-update");
      event.target.nextElementSibling.classList.add("display-save-quantity");
    });
  });
  document.querySelectorAll(".save-item-quantity").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(
        event.target.dataset.productId,
        Number(event.target.previousElementSibling.value),
      );
      updateCartItemQuantity(
        event.target.dataset.productId,
        Number(event.target.previousElementSibling.value),
      );
      renderCart();
      renderPaymentSummary();
    });
  });
  document.querySelectorAll(".delete-link").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      removeFromCart(event.target.dataset.productId);
      renderCart();
      renderPaymentSummary();
    });
  });
  document.querySelector(".js-place-order").addEventListener("click", () => {
    addOrder(orderTotal);
    removeFromCart();
    window.location.href = "orders.html";
  });
}
