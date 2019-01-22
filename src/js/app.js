import {TaskList, Task} from './lib.js';

const formEl = document.querySelector('#task-form'); // через # id
const nameEl = document.querySelector('#task-name');
const addpriceEl = document.querySelector('#task-price');
const listEl = document.querySelector('#task-list');
const priceEl = document.querySelector('#price-list');
const totalpriceEl = document.getElementById('total_price');
const taskList = new TaskList();

formEl.addEventListener('submit', function (evt) {
    // есть на некоторые события дефолтное поведение
    // click - переход
    // при отправке - страница перезагружается, форма отправляется на сервер
    evt.preventDefault(); // просим браузер не делать то, что он делает по умолчанию (обновление стр)
    const name = nameEl.value;
    const price = parseInt(addpriceEl.value);
    const liEl = document.createElement('li');
    const errorEl = document.getElementById('error-box');
    // todo: валидация
    if (isNaN(addpriceEl.value)) {
        errorEl.classList.remove('invisible');
        return;
    }
    if (addpriceEl.value < 0) {
        errorEl.classList.remove('invisible');
        return;
    }
    if (addpriceEl.value === '') {
        errorEl.classList.remove('invisible');
        return;
    }
    if (addpriceEl.value === '0'){
        errorEl.classList.remove('invisible');
        return;
    }

    const task = new Task(name, price);
    totalpriceEl.textContent = taskList.add(task);
    errorEl.classList.add('invisible');
    nameEl.value = '';
    addpriceEl.value = '';
    taskList.max_price(task);

    const totalTextEl = document.getElementById('total_text');
    totalTextEl.classList.remove('invisible');

    //  создали элемент
    const priceEl = document.createElement('span');
    // подставили
    liEl.textContent = task.name;
    priceEl.textContent = task.price;
    // пока у элемента нет родителя, он не отображается
    liEl.className = 'list-group-item float-left';
    priceEl.className = 'badge badge-success';
    const removeEl = document.createElement('button');
    // <button type="button" class="btn btn-danger">Danger</button>
    removeEl.className = 'btn btn-outline-danger btn-sm float-right'; // class bootstrap
    removeEl.textContent = 'Удалить';


    removeEl.addEventListener('click', function (evt) {
        liEl.remove(); // не везде работает
        // taskList.remove(task);
        totalpriceEl.textContent = taskList.remove(task);
    });

    // Самая трудоемкая часть синхронизация между DOM и памятью

    liEl.appendChild(priceEl);
    liEl.appendChild(removeEl); //  в скобки берется тот, кого берут
    listEl.appendChild(liEl); // метод взять ребенка


});