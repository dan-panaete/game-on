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
      const name = button.getAttribute('data-name');
			const price = button.getAttribute('data-price');
			const imageURL = button.getAttribute('data-image');
			let cart = JSON.parse(localStorage.getItem('cart')) || {};
			if (cart[productId]) {
				cart[productId].quantity++;
			} else {
				cart[productId] = {
					quantity: 1,
					price: Number(price),
					image: imageURL,
					name: name,
				};
			}
			localStorage.setItem('cart', JSON.stringify(cart));
		});
	});
}