import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

const productsContainer = document.querySelector(".products");

document.addEventListener("DOMContentLoaded", displayProducts);

async function displayProducts() {
  const products = await getAllProducts();

  productsContainer.innerHTML = products.map(mapProductToCard).join("");
}