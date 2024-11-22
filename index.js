import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

const productsContainer = document.querySelector(".products");

document.addEventListener("DOMContentLoaded", displayProducts);

async function displayProducts() {
  const products = await getAllProducts();

  productsContainer.innerHTML = products.map(mapProductToCard).join("");
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
	addToCartButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.getAttribute('data-productId');
			let cart = JSON.parse(localStorage.getItem('cart')) || {};
			if (cart[productId]) {
				cart[productId].quantity++;
			} else {
				cart[productId] = { quantity: 1 };
			}
			localStorage.setItem('cart', JSON.stringify(cart));
		});
	});
}