import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #products;

  #filterNoNuts = [];
  #filterVegeterian = [];
  #filterSpicines = [];
  #filterCategory = [];

  elem = createElement(`<div class="products-grid">
              <div class="products-grid__inner">
              </div>
            </div>`);


  constructor(products) {
    this.#products = products;
    this.filters = {};

    this.#render();
    this.#initFilter();
  }

  #render(){
    this.#products.forEach(element => {

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

  #initFilter() {

    const noNuts = document.querySelector('[data-no-nuts]');
    const vegetarian = document.querySelector('[data-vegetarian-only]');
    const maxSpiciness = document.querySelector('[data-max-spiciness]');
    const category = document.querySelector('[data-category]');
    
    if (noNuts.checked) {
      this.filters.noNuts = true
    } else {
      this.filters.noNuts = false;
    }
    if(vegetarian.checked) {
      this.filters.vegetarian = true
    } else {
      this.filters.vegetarian = false;
    }
    if(maxSpiciness.checked) {
      this.filters.maxSpiciness = 2
    } else {
      this.filters.maxSpiciness = 0;
    }

    if(category.checked) {
      this.filters.category = 'soups'
    } else {
      this.filters.category = '';
    }
  }

  updateFilter(filters) {

    if (filters.category || filters.maxSpiciness || filters.vegeterianOnly || filters.noNuts) {
      this.elem.querySelector('.products-grid__inner').innerHTML = '';

      if (filters.category){
        this.#filterCategory = this.#products.filter(item => item.category === filters.category);
      } else {
        this.#filterCategory = [];
      }

      if (filters.maxSpiciness){
        this.#filterSpicines = this.#products.filter(item => item.spiciness > filters.maxSpiciness);
      } else {
        this.#filterSpicines = [];
      }

      if (filters.vegeterianOnly){
        this.#filterVegeterian = this.#products.filter(item => item.vegeterian);
      } else {
        this.#filterVegeterian = [];
      }

      if (filters.noNuts){
        this.#filterNoNuts = this.#products.filter(item => item.nuts);
      } else {
        this.#filterNoNuts = [];
      }

      let result = [];
      result = result.concat(this.#filterNoNuts, this.#filterVegeterian, this.#filterSpicines, this.#filterCategory);
      this.#render(result);

    } else {
      this.#render(this.products);
    }


  }
}
