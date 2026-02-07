import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
import { moneyCalculator } from "./money.js";
let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
    <div class="product">
            <div class="image-container"><img src=${product.image} class="product-image"></div>
            <p>${product.name}</p>
            <div>
                <img src="../images/ratings/rating-${product.rating.stars * 10}.png" class="ratings-image" alt="">
                <span>${product.rating.count}</span>
            </div>

            <b>$${moneyCalculator(product.priceCents)}</b>
            <select class="js-quantity-selector-${product.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <div class="added-to-cart-msg">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `;
});
let timeout;
document.querySelector(".amazon-main").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.target.previousElementSibling.classList.add(
      "added-to-cart-msg-visible",
    );
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      event.target.previousElementSibling.classList.remove(
        "added-to-cart-msg-visible",
      );
    }, 2000);
    addToCart(button.dataset.productId);
  });
});
