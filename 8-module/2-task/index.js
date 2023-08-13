import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #products;

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

      let layout = createElement(`<div class="card">
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
                                </div>`);
      this.elem.querySelector('.products-grid__inner').appendChild(layout);
    })

  }

  initFilter() {
    this.filters.noNuts = false;
    this.filters.vegeterianOnly = false;
    this.filters.maxSpiciness = 4;
    this.filters.category = '';
  }

  updateFilter(filters) {
    console.log(filters);

    this.filters = Object.assign(this.filters, filters);
    let checkedPoints = document.querySelectorAll('input:checked');
    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    if (filters.category || filters.vegeterianOnly || filters.maxSpiciness || filters.noNuts) {
      
      let res = [];
      
      this.#products.forEach(item => {

        let checkesCount = checkedPoints.length;

        if(this.filters.noNuts) {
          if(!item.nuts) {
            checkesCount--;
          }else {
            return;
          }
        } 
        if(this.filters.vegeterianOnly) {
          if(item.vegeterian) {
            checkesCount--;
          }else {
            return;
          }
        }
        if(this.filters.maxSpiciness !=  4) {
          if(item.spiciness <= this.filters.maxSpiciness) {
            checkesCount--;
          }else {
            return;
          }
        }
        if(this.filters.category != '') {
          if(item.category === this.filters.category) {
            checkesCount--;
          }else {
            return;
          }
        }
          
        if(checkesCount === 0){
          res.push(item);
        }
        
      });

      this.#render(res);
    } else {
      this.#render(this.#products);
    }

  }
}
