const mapElement = document.getElementById("map");

const marqueeElement = document.getElementById("marquee");

const cityNameElement = document.getElementById("cityName");
const productNameElement = document.getElementById("productName");
const quantityElement = document.getElementById("quantity");

const soldProductCount = document.getElementById("soldProductCount");

const defaultColor = "#e4e4e4";
const fillColor = "#2064aa";

const API_ENDPOINT = "http://localhost:5000";
const PRODUCT_COUNT = 10;
const PRODUCT_SHOW_DURATION = 3 * 1000; // in seconds

let data = [];
let total = 0;
let currentIndex = 0;

const scrollMarquee = () => {
  marqueeElement.scrollBy(0.8, 0);

  if (marqueeElement.scrollLeft >= marqueeElement.scrollWidth - marqueeElement.offsetWidth) {
    marqueeElement.scrollTo(0, 0);
  }
};

const fetchCitySales = async () => {
  // clear marquee element first
  const pElement = marqueeElement.getElementsByTagName("p")[0];
  pElement.innerText = "";

  // fetch latest product sale data from API
  const _ = await (await fetch(`${API_ENDPOINT}/city-sales`)).json();

  _.forEach(cityData => {
    const spanElement = document.createElement("span");
    spanElement.classList="mx-10 whitespace-nowrap ";
    spanElement.innerText = `${cityData.cityName} : ${cityData.quantity} adet`;
    pElement.appendChild(spanElement);
  });
};

const updateTotalSaleCounter = () => {
  const current = Number(soldProductCount.innerText);

  const step = parseInt((total - current) / 8);

  let _index = 0;

  let interval = setInterval(() => {
    const temp = Number(soldProductCount.innerText);

    soldProductCount.innerText = temp + step;

    _index++;

    if (_index == 8) {
      clearInterval(interval);
    }
  }, 150);
};

const fetchRecentSales = async () => {
  // fetch latest product sale data from API
  const _ = await (await fetch(`${API_ENDPOINT}/recent-sales`)).json();

  data = _.sales;
  total = _.total;

  updateTotalSaleCounter();

  // start showing product sales on map from first item
  currentIndex = 0;

  showNextSaleOnMap();
};

const showNextSaleOnMap = async () => {
  // get current sale info from fetched data
  const currentData = data[currentIndex];

  // center map to current sale location
  const cityElement = mapElement.getElementsByClassName(`city-${currentData.cityCode.toString().padStart(2, 0)}`)[0];

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
// fetch new data from API in each 150 seconds (15 seconds per sale, 10 sale)
setInterval(fetchCitySales, 60000);
// immediately fetch city list data
fetchCitySales();
// fetch first batch of sale immediately
fetchRecentSales();
// iterate to next sale on fetched data in each 15 seconds
setInterval(showNextSaleOnMap, PRODUCT_SHOW_DURATION);
// scroll city sales section
setInterval(scrollMarquee, 12);
