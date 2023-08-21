import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem;

  constructor() {
    this.#render();
    this.#close();
  };

  #render(){
    this.elem = createElement(`<div class="modal">
          <div class="modal__overlay"></div>

          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>

              <h3 class="modal__title">
              </h3>
            </div>

            <div class="modal__body">
            </div>
          </div>

        </div>`);
        
  };

  setTitle(text){
    this.elem.querySelector('.modal__title').textContent = text;
  };

  setBody(bodyElem){
    this.elem.querySelector('.modal__body').insertAdjacentElement('afterbegin', bodyElem);
  };

  open(){
    document.querySelector('body').classList.add('is-modal-open');
    document.querySelector('.container').appendChild(this.elem);
    document.querySelector('.button').style.display = 'none';

    this.elem.querySelector('.modal__close').addEventListener('click', function(){
      document.querySelector('body').classList.remove('is-modal-open');
      document.querySelector('.button').style.display = 'block';
      document.querySelector('.modal').remove();
    })

    document.onkeydown = function(evt) {
      if (evt.key == 'Escape' && document.querySelector('body').classList.contains('is-modal-open')) {
        document.querySelector('body').classList.remove('is-modal-open');
        document.querySelector('.button').style.display = 'block';
        document.querySelector('.modal').remove();
      }
    };
  };

}
