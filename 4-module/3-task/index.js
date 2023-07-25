function highlight(table) {
  for(let i = 1; i< table.rows.length; i++){

    //проверка содержимого ячейки Gender
    if(table.rows[i].cells[2].textContent === 'm'){
      table.rows[i].classList.add('male');
    } else {
      table.rows[i].classList.add('female');
    }

    //проверка поля возраста
    if(table.rows[i].cells[1].textContent <= 18){
      table.rows[i].style.textDecoration = 'line-through';
    } 

    //проверка на наличие и значения атрибута data-available
    if(table.rows[i].cells[3].dataset.available === undefined){
      table.rows[i].setAttribute('hidden','');
      continue;
    }
    if(table.rows[i].cells[3].dataset.available === 'true'){
      table.rows[i].classList.add('available');
    }
    if(table.rows[i].cells[3].dataset.available === 'false') {
      table.rows[i].classList.add('unavailable');
    }
  }
}
