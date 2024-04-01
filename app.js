let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Apel",
    image: "apple.png",
    price: 5000,
  },
  {
    id: 2,
    name: "Jeruk",
    image: "orange.png",
    price: 4000,
  },
  {
    id: 3,
    name: "Melon",
    image: "melon.png",
    price: 12000,
  },
  {
    id: 4,
    name: "Buah Naga",
    image: "dragonfruit.png",
    price: 6000,
  },
  {
    id: 5,
    name: "Strawberry",
    image: "strawberry.png",
    price: 5000,
  },
  {
    id: 6,
    name: "Semangka",
    image: "watermelon.png",
    price: 12000,
  },
  {
    id: 7,
    name: "Nanas",
    image: "pineapple.png",
    price: 12000,
  },
  {
    id: 8,
    name: "Durian",
    image: "durian.png",
    price: 12000,
  },
  {
    id: 9,
    name: "Pisang",
    image: "banana.png",
    price: 7000,
  },
  {
    id: 10,
    name: "Kiwi",
    image: "kiwi.png",
    price: 5000,
  },
  {
    id: 11,
    name: "Lemon",
    image: "lemon.png",
    price: 6000,
  },
  {
    id: 12,
    name: "Mangga",
    image: "mango.png",
    price: 6000,
  },
  {
    id: 13,
    name: "Pepaya",
    image: "papaya.png",
    price: 10000,
  },
  {
    id: 14,
    name: "Alpukat",
    image: "avocado.png",
    price: 8000,
  },
  {
    id: 15,
    name: "Anggur",
    image: "grapes.png",
    price: 10000,
  },
];
let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button class="btn btn-success" onclick="addToCard(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
  });
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    // copy product form list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );
  renderProducts(filteredProducts);
});

function renderProducts(productsArray) {
  list.innerHTML = "";
  productsArray.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
          <img src="image/${value.image}">
          <div class="title">${value.name}</div>
          <div class="price">${value.price.toLocaleString()}</div>
          <button class="btn btn-success" onclick="addToCard(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
  });
}

function initApp() {
  renderProducts(products);
}

// Fungsi untuk menginisialisasi aplikasi
function initApp() {
  // Render produk untuk pertama kali
  renderProducts(products);

  // Event listener untuk setiap opsi dropdown
  const cheapestOption = document.querySelector(
    ".dropdown-item[value='cheapest']"
  );
  const expensiveOption = document.querySelector(
    ".dropdown-item[value='expensive']"
  );

  cheapestOption.addEventListener("click", () => {
    // Mengurutkan produk berdasarkan harga terendah
    const sortedProducts = products.slice().sort((a, b) => a.price - b.price);
    renderProducts(sortedProducts);
  });

  expensiveOption.addEventListener("click", () => {
    // Mengurutkan produk berdasarkan harga tertinggi
    const sortedProducts = products.slice().sort((a, b) => b.price - a.price);
    renderProducts(sortedProducts);
  });
}
