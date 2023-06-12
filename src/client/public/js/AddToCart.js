export default class AddToCart {
  #card;
  #cart;
  #incrementButton;
  #decrementButton;
  #quantityInput;
  #quantity;
  #addToCartFromStoreButtonButton;
  static instances = [];

  constructor(card) {
    this.#card = card;
    this.#cart = card.querySelector('.add-to-cart');
    this.#incrementButton = this.#cart.querySelector('.increment-button');
    this.#decrementButton = this.#cart.querySelector('.decrement-button');
    this.#quantityInput = this.#cart.querySelector('.quantity-input');

    this.#quantity = this.#quantityInput.value;
    this.#addToCartFromStoreButtonButton = this.#cart.querySelector(
      '.add-to-cart-from-store-button'
    );
    this.#addEvents();
    AddToCart.instances.push(this);
  }

  #addEvents() {
    this.#incrementButton.addEventListener('click', e => {
      console.log('increment');
      this.#incrementQuantity(1);
    });
    this.#decrementButton.addEventListener('click', e => {
      console.log('decrement');
      this.#incrementQuantity(-1);
    });
  }

  #incrementQuantity(quantity) {
    this.#quantity = Math.max(++this.#quantity, 0);
    if (this.#quantity == 0) {
      if (!this.#decrementButton.getAttribute('disabled')) {
        this.#decrementButton.getAttribute('disabled');
      }
    } else {
      if (!this.#decrementButton.getAttribute('disabled')) {
        this.#decrementButton.removeAttribute('disabled');
      }
    }
    console.log(this.#quantity);
    this.#quantityInput.value = this.#quantity;
  }
}
