import ProductCard from './ProductCard.js';

let throttleTimerOn = false;
let throttleDuration = 100;
let throttle = 0;

const store = document.querySelector('.store');
const cardTemplate = document.querySelector('#product-card');
const search = document.querySelector('#search');

const preloadDistance = 350;

const distanceToEnd = function () {
  const scrollBottom = store.scrollTop + store.clientHeight;
  return store.scrollHeight - scrollBottom;
};

loadProduct(search.value);

store.addEventListener('scroll', e => loadProductToFillScreen(search.value));
search.addEventListener('input', doProductSearch);

function loadProductToFillScreen(productPartial = null) {
  if (distanceToEnd() < preloadDistance) {
    setTimeout(() => loadProduct(productPartial), 250);
  }
}

function loadProduct(productPartial) {
  const card = new ProductCard(loadProductToFillScreen(), productPartial);
}

function throttleTimer(cb, productPartial) {
  if (throttle !== 0) {
    throttle.clearTimer();
  }
  throttleTimerOn = true;
  throttle = setTimeout(() => {
    throttleTimerOn = false;
  }, `${throttleDuration}ms`);
  cb(search.value);
}

function removeCards() {
  return new Promise((resolve, reject) => {
    try {
      while (store.children.length > 0) {
        store.children[0].remove();
      }
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });
}

function doProductSearch(e) {
  removeCards();
  loadProductToFillScreen(search.value);
}
