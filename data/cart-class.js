import { products } from "../data/products.js";
import { validDeliveryOption } from "./deliveryCart.js";

class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }
  getProduct(productId) {
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    return matchingProduct;
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;

    this.saveToStorage();
  }

  // add to cart function for product.js
  addToCart(productId, quantity) {
    let matchingitem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });

    if (matchingitem) {
      matchingitem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingitem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });
    if (!matchingitem) {
      return;
    }

    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }
    matchingitem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

let cart = new Cart("cart-oop");
let bussinessCart = new Cart("cart-bussiness");

cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 3);

console.log(cart);
console.log(bussinessCart);

console.log(cart instanceof Cart);
