import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #products;

  #filterNoNuts = [];
  #filterVegeterian = [];
  #filterSpicines = [];
  #filterCategory = [];

  noNuts;
  vegetarian;
  maxSpiciness;
  category;

  elem = createElement(`<div class="products-grid">
              <div class="products-grid__inner">
              </div>
            </div>`);


  constructor(products) {
    this.#products = products;
    this.filters = {};

    this.#render(this.#products);
    this.initFilter();
  }

  #render(list){
    list.forEach(element => {

      let layout = `<div class="card">
                      <div class="card__top">
                          <img src="/assets/images/products/${element.image}" class="card__image" alt="product">
                          <span class="card__price">€${element.price.toFixed(2)}</span>
                      </div>
                      <div class="card__body">
                          <div class="card__title">${element.name}</div>
                          <button type="button" class="card__button">
                              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                          </button>
                      </div>
                    </div>`;
      this.elem.querySelector('.products-grid__inner').appendChild(createElement(layout));
    })

  }

  initFilter() {
    this.noNuts = document.querySelector('[data-no-nuts]');
    this.vegetarian = document.querySelector('[data-vegetarian-only]');
    this.maxSpiciness = document.querySelector('[data-max-spiciness]');
    this.category = document.querySelector('[data-category]');

    this.filters.noNuts = false;
    this.filters.vegetarian = false;
    this.filters.maxSpiciness = 4;
    this.filters.category = '';
  }

  updateFilter(filters) {

    this.filters = Object.assign(this.filters, filters);
    this.elem.querySelector('.products-grid__inner').innerHTML = '';


    if (filters.category  || filters.maxSpiciness <= '2'  || filters.vegeterianOnly || filters.noNuts) {
      let checkedPoints = document.querySelectorAll('input:checked');
      let res = [];
      this.#products.forEach(item => {

        checkedPoints.forEach(checkItem => {

          if(checkItem.hasAttribute('data-no-nuts')) {
            if(item.nuts) {
              return;
            }
          } 
          if(checkItem.hasAttribute('data-vegetarian-only')) {
            if(!item.vegeterian) {
              return;
            }
          }
          if(checkItem.hasAttribute('data-max-spiciness')) {
            if(!(item.spiciness <= this.filters.maxSpiciness)) {
              return;
            }
          }
          if(checkItem.hasAttribute('data-category')) {
            if(!(item.category === this.filters.category)) {
              return;
            }
          }
          res.push(item);
        });

        
      });
      this.#render(res);

    } else {
      this.#render(this.#products);
    }

  }
}
