import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides;
  elem;

  constructor(slides) {
    this.#slides = slides;
    this.#render();
    this.#setArrowListeners();
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

      item.querySelectorAll('.carousel__button').forEach(btn => {
        btn.addEventListener('click', () => {
          this.#onCardClick(slide);
        });
      });

      container.appendChild(item);
      });

      return container;
  }

  /**
   * Формирование разметки
   */
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
  }

  /**
   * Пользовательское событие нажатия на карточку
   */
    #onCardClick(slide){
      const event = new CustomEvent("product-add", {
        detail: slide.id,
        bubbles: true
      });

      this.elem.querySelector('.carousel__button').dispatchEvent(event);
    }

    /**
     * Логика прокрутки карусели
     */
    #setArrowListeners(){
      let countOfSlides = this.elem.querySelectorAll('.carousel__slide').length-1;

      let rightArrow = this.elem.querySelector('.carousel__arrow_right');
      let leftArrow = this.elem.querySelector('.carousel__arrow_left');
  
      leftArrow.style.display = 'none';

      let currentPosition = 0;
      
      let slideContainer = this.elem.querySelector('.carousel__inner');

      rightArrow.addEventListener('click',()=>{

        let widthSlide = this.elem.querySelector('.carousel__slide').offsetWidth;

        if(currentPosition == 0){
          leftArrow.style.display = '';
        }

        if(currentPosition < countOfSlides){
          currentPosition++;
        }

        slideContainer.style.transform = `translateX(-${widthSlide*currentPosition}px)`;

        if(currentPosition == countOfSlides){
          rightArrow.style.display = 'none';
        }  

      });

      leftArrow.addEventListener('click',()=>{

        let widthSlide = this.elem.querySelector('.carousel__slide').offsetWidth;

        if(currentPosition == countOfSlides){
          rightArrow.style.display = '';
        }
        
        if(currentPosition >= 0){
          currentPosition--;
        }

        slideContainer.style.transform = `translateX(-${widthSlide*currentPosition}px)`;

        if(currentPosition == 0){
          leftArrow.style.display = 'none';
        } 
        
      });
    }
}