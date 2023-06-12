import AddToCart from './AddToCart.js';

const cableImage = [
  'cable-1.jpg',
  'cable-2.jpg',
  'cable-3.jpg',
  'cable-4.png',
  'cable-5.jpg',
];

function randomCable() {
  return cableImage[parseInt(Math.random() * cableImage.length)];
}

export default class ProductCard {
  static #cardTemplate = document.querySelector('#product-card');
  static #store = document.querySelector('.store');
  static #skip = 0;

  #addToCart;
  #productData;
  #card;
  #productPartial;

  constructor(cb, productPartial) {
    const cardClone = ProductCard.#cardTemplate.content.cloneNode(true);
    this.#card = cardClone.querySelector('.card');
    this.#productPartial = productPartial;
    ProductCard.#store.appendChild(this.#card);
    this.#loadProduct(ProductCard.#skip++, (productPartial = null));
    new AddToCart(this.#card);
  }

  #el(element, data, type = 'text') {
    switch (type) {
      case 'text':
        this.#card.querySelector(element).textContent = data;
        break;
      case 'image':
        const img = document.createElement('img');
        img.setAttribute('src', `img/${data}`);
        img.alt = 'Cable';
        this.#card.querySelector(element).appendChild(img);
        break;
    }
    this.#card.dataset.loaded = 'true';
  }

  async #loadProduct(index) {
    let productPartialString = '';
    if (this.#productPartial != null)
      productPartialString = `&productPartial=${this.#productPartial}`;
    const response = await fetch(
      `/api/product/?skip=${index}&limit=1${productPartialString}`
    );
    const productData = await response.json();
    this.#productData = productData[0];
    this.#populate();
  }

  #populate() {
    if (!this.#productData) return;
    const {
      partCode,
      description,
      luckinsData,
      brandName,
      stockUnit,
      pricePer,
    } = this.#productData;

    const image = randomCable();
    this.#el('.product-image', image, 'image');
    this.#el('.part-code span', partCode);
    this.#el('.description span', description);
    this.#el('.brand span', luckinsData?.brandName || 'Acme Elec');
    this.#el(
      '.price',
      new Intl.NumberFormat('eb-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(luckinsData?.pricing[0]?.price) || 'Please Call'
    );
    this.#el(
      '.price-quantity',
      ProductCard.#priceQuantity(luckinsData?.priceQuantity || pricePer || 1)
    );
    this.#el(
      '.unit',
      ProductCard.#priceQuantity(
        luckinsData?.pricing[0]?.priceUnit || stockUnit
      )
    );
    this.#el('.terms span', ProductCard.#terms(0));
  }

  static #priceQuantity(priceQuantity) {
    if (!priceQuantity || priceQuantity == 1 || priceQuantity == 0) return '';
    return ` / ${priceQuantity}`;
  }

  static #priceUnit(unit) {
    if (!unit) return '';
    return ` ${unit}`;
  }

  static #terms(terms) {
    if (terms && terms > 0) {
      return `${terms} %`;
    }
    return 'NETT';
  }
}
