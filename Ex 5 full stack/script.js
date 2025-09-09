const filterDropdown = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product");

filterDropdown.addEventListener("change", () => {
  const selectedCategory = filterDropdown.value;

  products.forEach(product => {
    const category = product.getAttribute("data-category");

    if (selectedCategory === "all" || category === selectedCategory) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});
