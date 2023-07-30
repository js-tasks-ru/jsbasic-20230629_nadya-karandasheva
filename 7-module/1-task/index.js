import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #categories;
  elem;

  constructor(categories) {
    this.#categories = categories;
    this.#render();
    this.#scroll();
  }

  /**
   * Генерация разметки
   */
  #render(){
    this.elem  = createElement(`
          <div class="ribbon">
            <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
          </div>`);
    let nav = createElement(`<nav class="ribbon__inner"></nav>`); 
    
    this.#categories.forEach(item => {
      let elem = createElement(`<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`);

      elem.addEventListener('click', () => {
          this.#setListenersForCategories(item)
      });

      nav.appendChild(elem);
    });

    this.elem.appendChild(nav);

    this.elem.appendChild(createElement(`
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    `));
  }

  /**
   * Обработка нажатия на ссылки категорий
   * @param {object} item - объект ссылки, на которую нажали
   */
  #setListenersForCategories(item){
    const event = new CustomEvent("ribbon-select", {
      detail: item.id,
      bubbles: true
    });

    this.elem.querySelector('.ribbon__item').dispatchEvent(event);
  }

  /**
   * обработка скрола по нажатию на стрелки прокрутки
   */
  #scroll(){
    let lefrRow = this.elem.querySelector('.ribbon__arrow_left');
    let rightRow = this.elem.querySelector('.ribbon__arrow_right');
    let container = this.elem.querySelector('.ribbon__inner');

    lefrRow.onclick = () => {
      container.scrollBy(-350, 0);
    }
    
    rightRow.onclick = () => {
      container.scrollBy(350, 0);
    }
  }
}
