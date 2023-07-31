/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows;
  elem; 

  constructor(rows) {
    this.#rows = rows;
    this.#render();
  }

  /**
   * Преобразование строки в html разметку
   * @param {string} elem - строка html разметки
   * @returns html элемент
   */
  #createElement(elem){
    const temp = document.createElement('table');
    temp.innerHTML = elem;
    return temp.firstElementChild;
  }

  /**
   * Генерирует тело
   */
  #bodyConstructor(){
    this.#rows.forEach(row => {
      const dataRow = `
                    <td>${row.name}</td>
                    <td>${row.age}</td>
                    <td>${row.salary}</td>
                    <td>${row.city}</td>
                    <td><button>X</button></td>`;
      this.elem.appendChild(this.#createElement(dataRow));
    });
  };

  /**
   * Генерирует разметку таблицы
   */
  #render(){
    this.elem = document.createElement('table');

    const tableHeader = `<thead>
                          <tr>
                            <th>Имя</th>
                            <th>Возраст</th>
                            <th>Зарплата</th>
                            <th>Город</th>
                            <th></th>
                          </tr>
                        </thead>`;
    this.elem.appendChild(this.#createElement(tableHeader));
    this.#bodyConstructor();  
    this.#setEventListeners();
  }

  /**
   * Устанавливает слушатели события на конпки удаления строк
   */
  #setEventListeners(){
    this.elem.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (event) => {
        this.#deleteRow(event.target);
      });
    })
  }

  /**
   * Удалене строки
   */
  #deleteRow(btn){
    btn.parentNode.parentNode.remove();
  }
}