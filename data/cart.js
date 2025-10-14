export let cart = [];

export function addToCart(productId) {
  let selectQuantity = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  let quantity = Number(selectQuantity.value);

  let matchingitem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingitem = cartItem;
    }
  });

  if (matchingitem) {
    matchingitem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
}
