import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
quantityOfCart();

products.forEach((product) => {
  productsHTML += `
<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
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
          </div>
          ${product.extraInfoHTML()} 
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
`;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

// Update Cart Quantity
function updateCartQuantity(productId) {
  quantityOfCart();

  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addedMessage.style.opacity = 1;

  if (addedMessageTimeouts[productId]) {
    clearTimeout(addedMessageTimeouts[productId]);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.style.opacity = 0;
    delete addedMessageTimeouts[productId];
  }, 2000);

  addedMessageTimeouts[productId] = timeoutId;
}
let addedMessageTimeouts = {};

//click button and function starts
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    let selectQuantity = document.querySelector(
      `.js-quantity-selector-${productId}`,
    );
    let quantity = Number(selectQuantity.value);

    addToCart(productId, quantity);
    updateCartQuantity(productId);
  });
});

function quantityOfCart() {
  const cartQuantity = calculateCartQuantity();
  let displayQuantity = document.querySelector(".js-cart-quantity");
  if (!cartQuantity) {
    displayQuantity.innerHTML = "";
    return;
  }
  displayQuantity.innerHTML = cartQuantity;
}
