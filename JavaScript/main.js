import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage,updateCartIcon} from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

// menu iconuna tıklanınca menuye class ekle
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", async () => {
  let cart = getFromLocalStorage();

  if (window.location.pathname.includes("/cart.html")) {
    renderCartItems();
    displayCartTotal();
  } else {
    const products = await fetchProducts();
    renderProducts(products, (e) => {
      addToCart(e, products);
    });
  }
  updateCartIcon(cart);
});
