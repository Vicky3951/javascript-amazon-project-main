import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateDeliveryOption,
} from "../data/cart.js"; //Named Export
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryCart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //Default Export

function renderOredrSummary() {
  let cartSummaryHTML = "";
  updateCartQuantity();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${
          matchingProduct.id
        }">       
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src=${matchingProduct.image}
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <input type="number" min="1" max="1000" maxlength="4" class='quantity-input js-quantity-input'><span class="save-quantity-link link-primary js-save-link" data-product-id="${
                    matchingProduct.id
                  }">save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>  
  `;

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;

        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();

        updateCartQuantity();
      });
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      let input = container.querySelector(".js-quantity-input");

      const quantityNumber = Number(input.value);
      if (!quantityNumber || quantityNumber < 1) return;
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          // ✔ FIX: update actual cart quantity
          cartItem.quantity = cartItem.quantity + quantityNumber;

          // ✔ FIX: update UI label
          container.querySelector(".js-quantity-label").innerHTML =
            cartItem.quantity;

          console.log("Updated quantity:", cartItem.quantity);
        }
        input.value = "";
      });

      updateCartQuantity();
    });
  });

  document
    .querySelector(".js-quantity-input")
    .addEventListener("keyup", (event) => {
      const inputValue = event.target.value;
      if (inputValue.length > 4) {
        event.target.value = inputValue.slice(0, 4);
      }

      if (event.key === "Enter") {
        document.querySelector(".js-save-link").click();
      }
    });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let HTML = ``;
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

      HTML += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
                  <input
                    type="radio"
                    ${ischecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date js-delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString} Shipping</div>
                  </div>
                </div>
    `;
    });
    return HTML;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOredrSummary(); //recursion
    });
  });
}

renderOredrSummary();
