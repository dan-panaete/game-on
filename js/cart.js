document.addEventListener('DOMContentLoaded', showCart);

const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalContainer = document.querySelector('.cart-total');
let cart = JSON.parse(localStorage.getItem('cart')) || {}; // Initialize cart

function showCart() {
	cartItemsContainer.innerHTML = '';
	let total = 0;

	// Check if the cart is empty
	if (Object.keys(cart).length === 0) {
		cartTotalContainer.innerHTML = 'Cosul de cumparaturi este gol';
		return;
	}

	// Populate the cart UI
	for (let id in cart) {
		const item = cart[id];
		cartItemsContainer.innerHTML += `
			<div class="flex-row w-500 justify-between items-center border-bottom">
				<img width="50px" src="${item.image}" />
				<span>${item.name}</span>
				<span>${item.price} lei</span>
				<div>
					<button class="decrease" data-id="${id}">-</button>
					<span>${item.quantity}</span>
					<button class="increase" data-id="${id}">+</button>
				</div>
				<span>${(item.price * item.quantity).toFixed(2)} lei</span>
				<button class="delete" data-id="${id}">Sterge</button>
			</div>
		`;
		total += item.price * item.quantity;
	}

	cartTotalContainer.innerHTML = `Total: ${total.toFixed(2)} lei`;
}

cartItemsContainer.addEventListener('click', (event) => {
	const btn = event.target;
	const id = btn.getAttribute('data-id');

	// Handle button clicks
	if (btn.classList.contains('increase')) {
		cart[id].quantity++;
	} else if (btn.classList.contains('decrease')) {
		cart[id].quantity--;
		if (cart[id].quantity === 0) {
			delete cart[id]; // Remove item if quantity is 0
		}
	} else if (btn.classList.contains('delete')) {
		delete cart[id]; // Remove item from cart
	}

	// Save the updated cart to localStorage
	localStorage.setItem('cart', JSON.stringify(cart));
	showCart(); // Update UI
});
