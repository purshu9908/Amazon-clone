export const cart = JSON.parse(localStorage.getItem("Cart")) || [];
updateCartNumber();
export function addToCart(productId) {
  let matchingProduct = cart.find((product) => {
    return product.id === productId;
  });
  let quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value,
  );
  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
    });
  }
  updateCartNumber();
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("Cart", JSON.stringify(cart));
  console.log(JSON.parse(localStorage.getItem("Cart")));
}
function updateCartNumber() {
  let cartCount = cart.reduce((count, cartItem) => {
    return count + cartItem.quantity;
  }, 0);
  document.querySelector(".js-cart-count").innerText = cartCount;
}
