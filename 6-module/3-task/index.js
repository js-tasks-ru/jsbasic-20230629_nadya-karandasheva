import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides;
  elem = null;

  constructor(slides) {
    this.#slides = slides;
    this.#render();
  }

  #generateCarousel(){
    let container = createElement(`<div class="carousel__inner"><div>`);

    this.#slides.forEach(slide => {
      let item = createElement(
        `<div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€<${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`);

      container.appendChild(item);
      });

      return container;
  }

  #render(){
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `);

    let containerCarousel = this.#generateCarousel();
    this.elem.appendChild(containerCarousel);

    this.elem.querySelectorAll('.carousel__button').forEach(item => {
      
      item.addEventListener('click', (event) => {
        this.#onCardClick(event.target);
      });
    })
  }

  /**
   * Пользовательское событие нажатия на карточку
   */
    #onCardClick(elem){
      const event = new CustomEvent("product-add", {
        detail: elem.parentElement.parentElement.parentElement.dataset.id,
        bubbles: true
      });

      this.elem.querySelector('.carousel__button').dispatchEvent(event);
    }
}
