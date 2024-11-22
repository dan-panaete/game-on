import { getProductById } from "../api/products.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.getElementById("product-details-container").innerHTML =
      "Produsul nu a fost găsit.";
    return;
  }

  try {
    const product = await getProductById(productId);
    displayProductDetails(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    document.getElementById("product-details-container").innerHTML =
      "Eroare la încărcarea detaliilor produsului.";
  }
});

function displayProductDetails(product) {
  const container = document.getElementById("product-details-container");

  container.innerHTML = `
    <div class="product-details">
      <img class="product-image" src="${product.imageURL}" alt="${product.name}" />
      <h2 class="product-name">${product.name}</h2>
      <p class="product-price">${product.price} lei</p>
      <button id="add-to-cart-btn" class="add-to-cart-btn">Adaugă în coș</button>
    </div>
  `;

  // Add to Cart button event listener
  document
    .getElementById("add-to-cart-btn")
    .addEventListener("click", () => addToCart(product));
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[product.id]) {
    cart[product.id].quantity += 1; // Increment quantity if already in cart
  } else {
    cart[product.id] = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageURL,
      quantity: 1, // Start with 1 item
    };
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Show notification
  const notification = document.getElementById("notification");
  notification.innerHTML = "Produsul a fost adăugat în coș.";
  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}
