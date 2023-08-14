import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps;
  #value;
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;

    this.#render();
    this.#clickEvtListener();
    this.#dragAndDropEvtListener();
    this.sliderVChange();
  }

    /**
   * Формирование разметки
   */
    #render(){
      let step = '<span class="slider__step-active"></span>\n';
  
      for (let i = 1; i < this.#steps; i++ ) {
        step = step + '<span></span>\n'
        
      }
      let layout = `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress">
          <div class="slider__steps">
            ${
              step
            }
          </div>
        </div>
      </div>`;
  
      this.elem = createElement(layout);
    }

    #dragAndDropEvtListener() {
      let thumb = this.elem.querySelector('.slider__thumb');
      thumb.ondragstart = () => false;
  
      this.elem.addEventListener('pointerdown', () => {
  
        const pointerMove = (event) => {
  
          this.elem.classList.add('slider_dragging');
          this.elem.querySelector('.slider__thumb').style.left = event.pageX + 'px';
  
          let left = event.clientX - this.elem.getBoundingClientRect().left;
          let leftRelative = left / this.elem.offsetWidth;
  
          if (leftRelative < 0) {
            leftRelative = 0;
          }
  
          if (leftRelative > 1) {
            leftRelative = 0;
          }
  
          let leftPercents = leftRelative * 100;

          let thumb = this.elem.querySelector('.slider__thumb');
          let progress = this.elem.querySelector('.slider__progress');

          let segments = this.#steps - 1;
          let approximateValue = leftRelative * segments;
          this.#value = Math.round(approximateValue);

          thumb.style.left = `${leftPercents}%`;
          progress.style.width = `${leftPercents}%`;

          let sliderValue = this.elem.querySelector('.slider__value');
          sliderValue.textContent = this.#value;

          let sliderSteps = Array.from(this.elem.querySelector('.slider__steps').children);
          sliderSteps.forEach(item => item.classList.remove('slider__step-active'));
          sliderSteps[this.#value].classList.add('slider__step-active');
        };
  
        document.addEventListener('pointermove', pointerMove);
  
  
        document.onpointerup = () => {
          this.sliderVChange();
          document.removeEventListener('pointermove', pointerMove);
          thumb.onpointerup = null;
        }
      })
  
    }
  

  /**
   * Слушатель события на изменения слайдера
   */
  #clickEvtListener() {

    this.elem.addEventListener('click', (event) => {
      // Получение координаты клика
      let left = event.clientX - this.elem.getBoundingClientRect().left;

      // Относительная координата клика
      let leftRelative = left / this.elem.offsetWidth;

      // Кол-во промежутков между метками
      let area = this.#steps - 1;

      // Определение значения
      let value = Math.round(leftRelative * area);
      let valuePercents = value / area * 100;
      this.#value = value;

      // Элементы слайдера
      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      let sliderSteps = Array.from(this.elem.querySelector('.slider__steps').children);

      let sliderValue = this.elem.querySelector('.slider__value');
      sliderValue.textContent = this.#value;

      // Изменения стилей
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderSteps.forEach(step => step.classList.remove('slider__step-active'));
      sliderSteps[this.#value].classList.add('slider__step-active');
    })
  }


    sliderVChange() {
      this.elem.addEventListener('click', () => {
        let event = new CustomEvent('slider-change', {
          detail: this.#value,
          bubbles: true
        })
        this.elem.dispatchEvent(event);
      })
    }
}
