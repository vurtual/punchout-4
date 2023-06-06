const store = document.querySelector('.store');
const cardTemplate = document.querySelector('#product-card');
const preloadDistance = 100;
let productSkip = 0;
store.addEventListener('scroll', loadProductToFillScreen);

const distanceToEnd = function () {
  const scrollBottom = store.scrollTop + store.clientHeight;
  return store.scrollHeight - scrollBottom;
};

function loadProductToFillScreen() {
  if (distanceToEnd() < preloadDistance) loadNextProduct(++productSkip);
}

function loadNextProduct(skip) {
  displayCard();
  loadProduct(skip);
  loadProductToFillScreen();
}

function displayCard() {
  const cardClone = cardTemplate.content.cloneNode(true);
  const card = cardClone.querySelector('.card');
  store.appendChild(card);
  card.id = `id-${productSkip}`;
}

function loadProduct(skip) {
  fetch(`/product/?skip=${skip}`);
}

loadProductToFillScreen();
