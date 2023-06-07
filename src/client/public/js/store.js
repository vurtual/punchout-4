const store = document.querySelector('.store');
const cardTemplate = document.querySelector('#product-card');
const preloadDistance = 100;
store.addEventListener('scroll', loadProductToFillScreen);

const distanceToEnd = function () {
  const scrollBottom = store.scrollTop + store.clientHeight;
  return store.scrollHeight - scrollBottom;
};

function loadProductToFillScreen() {
  if (distanceToEnd() < preloadDistance) {
    const card = new ProductCard(loadProductToFillScreen);
  }
}

loadProductToFillScreen();
