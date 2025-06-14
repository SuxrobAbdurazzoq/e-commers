const productsUrl = "https://dummyjson.com/products";
const productList = document.getElementById("productList");
const showAllBtn = document.getElementById("showAllBtn");

let allProducts = [];
let shownCount = 5;

const getProducts = async () => {
  try {
    const res = await fetch(productsUrl);
    const data = await res.json();
    console.log(`Mahsulotlar muvaffaqiyatli topildi!`);
    allProducts = data.products;
    renderProducts(shownCount);
  } catch (error) {
    console.log(`Mahsulotlarni olib kelishda xatolik yuz berdi: ${error}`);
  }
};

function renderProducts(count) {
  productList.innerHTML = "";
  const productsToShow = allProducts.slice(0, count);

  productsToShow.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>💵 ${product.price} USD</p>
      <p>⭐ ${product.rating}</p>
    `;
    productList.appendChild(div);
  });

  if (count >= allProducts.length) {
    showAllBtn.style.display = "none";
  }
}

showAllBtn.addEventListener("click", () => {
  renderProducts(allProducts.length);
});

getProducts();
