function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
  updateWishlistCount();
}

function updateWishlistCount() {
  const badge = document.getElementById("wishlistCount");
  if (badge) badge.textContent = getWishlist().length;
}

function addToWishlist(product) {
  const list = getWishlist();
  if (!list.find(p => p.id === product.id)) {
    list.push(product);
    saveWishlist(list);
  }
}

function removeFromWishlist(id) {
  const list = getWishlist().filter(p => p.id !== id);
  saveWishlist(list);
  renderWishlist();
}

function renderWishlist(){
  const container = document.getElementById("wishlistItems");
  if(!container) return;

  const list = getWishlist();

  if(list.length === 0){
    container.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  container.innerHTML = list.map(item => `
    <div class="wishlist-card">
      <img src="${item.image}" alt="${item.name}">
      <div class="info">
        <h3>${item.name}</h3>
        <p>£${item.price.toFixed(2)}</p>

        <div class="wishlist-actions">
          <button class="btn-add add-cart-btn"
            data-id="${item.id}"
            data-name="${item.name}"
            data-price="${item.price}"
            data-image="${item.image}">
            🛒 Add to Cart
          </button>

          <button class="btn-secondary" onclick="removeFromWishlist(${item.id})">
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join("");
  attachWishlistAddToCart();
}

function attachWishlistAddToCart(){
  document.querySelectorAll(".add-cart-btn").forEach(btn=>{
    btn.onclick = ()=>{
      const id = Number(btn.dataset.id); // ✅ FIX

      addToCart({
        id: id,
        name: btn.dataset.name,
        price: Number(btn.dataset.price),
        image: btn.dataset.image
      }, 1);

      removeFromWishlist(id);
    };
  });
}




document.addEventListener("DOMContentLoaded", updateWishlistCount);
document.addEventListener("DOMContentLoaded", renderWishlist);