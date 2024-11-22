
document.addEventListener('DOMContentLoaded', showCart);
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalContainer = document.querySelector('.cart-total');
let cart;
function showCart() {
	cart = JSON.parse(localStorage.getItem('cart'));
	let total = 0;
	cartItemsContainer.innerHTML = '';
	for (let id in cart) {
		cartItemsContainer.innerHTML += `
         <div class="flex-row w-500 justify-between items-center border-bottom">
            <img width="50px" src=${cart[id].image} />
            <span>${cart[id].name}</span>
            <span>${cart[id].price} lei</span>
            <div>
               <button class="decrease" data-id=${id}>-</button>
               <span>${cart[id].quantity}</span>
               <button class="increase" data-id=${id}>+</button>
            </div>
            <span>${(cart[id].price * cart[id].quantity).toFixed(2)}lei</span>
            <button class="delete" data-id=${id}>Sterge</button>
         </div>
      `;
		total = total + cart[id].price * cart[id].quantity;
	}
	cartTotalContainer.innerHTML =
		total === 0
			? 'Cosul de cumparaturi este gol'
			: `Total: ${total.toFixed(2)} lei`;
}
cartItemsContainer.addEventListener('click', (event) => {
	const btn = event.target;
	const id = btn.getAttribute('data-id');
	if (btn.classList.contains('increase')) {
		cart[id].quantity++;
	} else if (btn.classList.contains('decrease')) {
		cart[id].quantity--;
	} else if (btn.classList.contains('delete')) {
		delete cart[id];
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	showCart();
});