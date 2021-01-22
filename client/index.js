const mapElement = document.getElementById("map");

const cityNameElement = document.getElementById("cityName");
const productNameElement = document.getElementById("productName");
const quantityElement = document.getElementById("quantity");

const defaultColor = "#e4e4e4";
const fillColor = "#2064aa";

const PRODUCT_COUNT = 10;
const PRODUCT_SHOW_DURATION = 15 * 1000; // in seconds


const showNextData = async () => {
  // get current sale info from fetched data
  const currentData = data[currentIndex];

  mapElement.querySelectorAll("g").forEach(e => e.setAttribute("fill", defaultColor));

  // center map to current sale location
  const cityElement = mapElement.getElementsByClassName(`city-${currentData.cityCode}`)[0];
  cityElement.setAttribute("fill", fillColor);

  cityNameElement.innerText = cityElement.getAttribute("data-cityname");
  quantityElement.innerText = currentData.quantity;
  productNameElement.innerText = currentData.productName;

  // iterate to next sale data
  currentIndex++;
  if (currentIndex >= data.length) {
    currentIndex = 0;
  }
};
