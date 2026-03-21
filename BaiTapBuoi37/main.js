// Bai 1
window.onload = function () {
    // Bài 1
    loadName();

    // Bài 2
    let count = localStorage.getItem("visitCount");
    if (count === null) {
        count = 0;
    }
    count = Number(count) + 1;
    localStorage.setItem("visitCount", count);
    updateDisplay(count);

    // Bài 3
    renderProducts();
    displayCart();
};
const input=document.getElementById("username");
document.getElementById("saveBtn").addEventListener("click", saveName);
function saveName(){
    const name=input.value.trim();
    input.value="";
    input.focus();
    localStorage.setItem("name",name);

    alert("Tên đã được lưu!");
}
document.getElementById("loadBtn").addEventListener("click", loadName);
function loadName(){
    const name=localStorage.getItem("name");
    if(name){
        document.getElementById("result").textContent=`Tên đã lưu: ${name}`;
    }
    else{
        document.getElementById("result").textContent="Chưa lưu tên";
    }
}
//Bai 2

function updateDisplay(count){
    document.getElementById("counter").textContent=`Số lần bạn truy cập trang này: ${count}`;
}

const resetBtn=document.getElementById("resetBtn");
resetBtn.addEventListener("click",function(){
    localStorage.setItem("visitCount",0);
    updateDisplay(0);
})
// Bai 3
const products = [
  {
    id: 1,
    name: "Áo",
    price: 100,
    image: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    name: "Quần",
    price: 200,
    image: "https://picsum.photos/200?random=2",
  },
  {
    id: 3,
    name: "Giày",
    price: 300,
    image: "https://picsum.photos/200?random=3",
  },
];


function renderProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${p.image}">
      <div class="product-name">${p.name}</div>
      <div class="product-price">${p.price}k</div>
      <button class="btn-add" onclick="addToCart(${p.id})">Thêm</button>
    `;

    container.appendChild(div);
  });
}

function addToCart(id) {
  let cart = sessionStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  const product = products.find((p) => p.id === id);
  cart.push(product);

  sessionStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

function displayCart() {
  let cart = sessionStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  document.getElementById("cartCount").innerText =
    "Số lượng: " + cart.length;

  const list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ${item.price}k`;
    list.appendChild(li);
  });
}

function clearCart() {
  sessionStorage.removeItem("cart");
  displayCart();
}