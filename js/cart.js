function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();

  // Number of distinct products
  const count = cart.length;

  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = count;

    // OPTIONAL: show total quantity on hover
    badge.title = cart.length
  ? `${cart.reduce((s, i) => s + i.qty, 0)} items total`
  : "";
  }
}



function addToCart(item, qty = 1){
  let cart = getCart();

  const existing = cart.find(p => p.id == item.id);

  if(existing){
    // merge quantity (professional behavior)
    existing.qty += qty;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}


function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
}

function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart(cart);
}
function syncHeaderCounts(){
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
  if (typeof updateWishlistCount === "function") {
    updateWishlistCount();
  }
}

// 🔁 Sync header counts across pages & tabs
window.addEventListener("storage", (e) => {
  if (e.key === "cart" || e.key === "wishlist") {
    syncHeaderCounts();
  }
});

// 🔄 Re-sync counts when page is revisited (bfcache fix)
window.addEventListener("pageshow", () => {
  syncHeaderCounts();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    syncHeaderCounts();
  }
});

