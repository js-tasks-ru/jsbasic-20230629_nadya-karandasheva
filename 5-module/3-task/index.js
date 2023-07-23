function initCarousel() {
  //количество слайдов
  let countOfSlides = document.querySelectorAll('.carousel__slide').length-1;

  //текущая позиция
  let currentPosition = 0;
  
  //контейнер карусели
  let slideContainer = document.querySelector('.carousel__inner');

  //ширина одного элемента карусели
  let widthSlide = document.querySelector('.carousel__slide').offsetWidth;

  //стрелки карусели
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let leftArrow = document.querySelector('.carousel__arrow_left');

  leftArrow.style.display = 'none';

  rightArrow.addEventListener('click',()=>{

    //проверка максимальной прокуртки влево
    if(currentPosition == 0){
      leftArrow.style.display = '';
    }

    //если еще не достигнут конец карусели +1 к позиции
    if(currentPosition < countOfSlides){
      currentPosition++;
    }

    slideContainer.style.transform = `translateX(-${widthSlide*currentPosition}px)`;

    //проверка максимальной прокуртки вправо
    if(currentPosition == countOfSlides){
      rightArrow.style.display = 'none';
    }  

  });

  leftArrow.addEventListener('click',()=>{

    //проверка максимальной прокуртки вправо
    if(currentPosition == countOfSlides){
      rightArrow.style.display = '';
    }
     
    //если еще не достигнуто начало карусели -1 к позиции
    if(currentPosition >= 0){
      currentPosition--;
    }

    slideContainer.style.transform = `translateX(-${widthSlide*currentPosition}px)`;

    //проверка максимальной прокуртки влево
    if(currentPosition == 0){
      leftArrow.style.display = 'none';
    } 
    
  });
}
