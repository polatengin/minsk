const mapElement = document.getElementById("map");

const marqueeElement = document.getElementById("marquee");

const cityNameElement = document.getElementById("cityName");
const productNameElement = document.getElementById("productName");
const quantityElement = document.getElementById("quantity");

const defaultColor = "#e4e4e4";
const fillColor = "#2064aa";

const API_ENDPOINT = "http://localhost:5000";
const PRODUCT_COUNT = 10;
const PRODUCT_SHOW_DURATION = 15 * 1000; // in seconds

let data = [];
let currentIndex = 0;

const scrollMarquee = () => {
  marqueeElement.scrollBy(0.8, 0);

  if (marqueeElement.scrollLeft >= marqueeElement.scrollWidth - marqueeElement.offsetWidth) {
    marqueeElement.scrollTo(0, 0);
  }
};

const fetchData = async () => {
  // fetch latest product sale data from API
  data = await (await fetch("http://localhost:5000")).json();

  // start showing product sales on map from first item
  currentIndex = 0;

  showNextData();
};

const showNextSaleOnMap = async () => {
  // get current sale info from fetched data
  const currentData = data[currentIndex];

  // center map to current sale location
  const cityElement = mapElement.getElementsByClassName(`city-${currentData.cityCode}`)[0];

  if (cityElement) {
    mapElement.querySelectorAll("g").forEach(e => e.setAttribute("fill", defaultColor));

    cityElement.setAttribute("fill", fillColor);

    cityNameElement.innerText = cityElement.getAttribute("data-cityname");
    quantityElement.innerText = currentData.quantity;
    productNameElement.innerText = currentData.productName;
  }

  // iterate to next sale data
  currentIndex++;
  if (currentIndex >= data.length) {
    currentIndex = 0;
  }
};

// fetch new data from API in each 150 seconds (15 seconds per sale, 10 sale)
setInterval(fetchRecentSales, PRODUCT_COUNT * PRODUCT_SHOW_DURATION);
// fetch first batch of sale immediately
fetchRecentSales();
// iterate to next sale on fetched data in each 15 seconds
setInterval(showNextData, PRODUCT_SHOW_DURATION);

setInterval(scrollMarquee, 12);
