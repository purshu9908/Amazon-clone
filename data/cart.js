export let cart = JSON.parse(localStorage.getItem("Cart")) || [];

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
      deliveryOptionId: "1",
    });
  }
  updateCartNumber();
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("Cart", JSON.stringify(cart));
  console.log(JSON.parse(localStorage.getItem("Cart")));
}
export function updateCartNumber() {
  let cartCount = cart.reduce((count, cartItem) => {
    return count + cartItem.quantity;
  }, 0);
  const cartElement = document.querySelector(".js-cart-count");
  if (cartElement) {
    cartElement.innerText = cartCount;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".js-cart-count")) {
    updateCartNumber();
  }
});
export function updateCartItemQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  const cartItem = cart.find((item) => item.id === productId);
  cartItem.quantity = newQuantity;
  saveToStorage();
  updateCartNumber();
}
export function removeFromCart(productId = 0) {
  if (productId === 0) {
    cart.length = 0;
  } else {
    const cartItemIndex = cart.findIndex((item) => item.id === productId);
    cart.splice(cartItemIndex, 1);
  }
  updateCartNumber();
  saveToStorage();
}
