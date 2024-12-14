const products = [];
const stores = 5; 
const productCount = 30; 
const productImages = [];


for (let i = 1; i <= productCount; i++) {
  const prices = [];
  for (let j = 1; j <= stores; j++) {
    prices.push(Math.floor(Math.random() * 1000) + 100); 
  }
  products.push({ name: `Товар ${i}`, prices });
  productImages.push(`https://via.placeholder.com/100?text=Товар+${i}`); 
}


function renderTable() {
  const container = document.getElementById("tableContainer");
  let tableHTML = "<table>";
  tableHTML += "<tr><th>Товар</th>";
  for (let i = 1; i <= stores; i++) {
    tableHTML += `<th>Магазин ${i}</th>`;
  }
  tableHTML += "</tr>";

  products.forEach((product, index) => {
    tableHTML += `<tr>`;
    tableHTML += `<td data-index="${index}" class="product">${product.name}</td>`;
    product.prices.forEach((price) => {
      tableHTML += `<td>${price}</td>`;
    });
    tableHTML += `</tr>`;
  });
  tableHTML += "</table>";
  container.innerHTML = tableHTML;
}

// Добавление номеров магазинов в выпадающий список
function populateSelect() {
  const select = document.getElementById("storeSelect");
  for (let i = 1; i <= stores; i++) {
    const option = document.createElement("option");
    option.value = i - 1;
    option.textContent = `Магазин ${i}`;
    select.appendChild(option);
  }
}

// Показать цены для выбранного магазина
function showFilteredPrices() {
  const selectedStore = document.getElementById("storeSelect").value;
  if (selectedStore === "") {
    alert("Выберите номер магазина!");
    return;
  }

  const filtered = products.map((product) => product.prices[selectedStore]);
  const output = document.getElementById("filteredPrices");
  output.innerHTML = "<h3>Цены для выбранного магазина:</h3>";
  output.innerHTML += `<ul>${filtered
    .map((price, i) => `<li>${products[i].name}: ${price}</li>`)
    .join("")}</ul>`;
}

// Показ изображения при клике
function setupImageDisplay() {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("product")) {
      const index = event.target.dataset.index;
      const img = document.createElement("img");
      img.src = productImages[index];
      img.alt = products[index].name;
      img.style.marginTop = "20px";
      const output = document.getElementById("filteredPrices");
      output.innerHTML = "";
      output.appendChild(img);
    }
  });
}

document.getElementById("showPrices").addEventListener("click", showFilteredPrices);

renderTable();
populateSelect();
setupImageDisplay();

