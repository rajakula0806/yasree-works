function setupProductPage(product) {

  const cartBtn = document.getElementById("btnAddCart");
  const wishBtn = document.getElementById("btnAddWish");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      addToCart(product, 1);
      updateCartCount();
      showToast("🛒 Added to cart");
    });
  }

  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      addToWishlist(product);
      updateWishlistCount();
      showToast("♡ Added to wishlist");
    });
  }
}
