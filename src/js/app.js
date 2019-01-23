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
    // todo: потестить валидатор
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
    if (addpriceEl.value === '0') {
        errorEl.classList.remove('invisible');
        return;
    }

    const task = new Task(name, price);
    totalpriceEl.textContent = taskList.add(task);
    errorEl.classList.add('invisible');
    nameEl.value = '';
    addpriceEl.value = '';


    const totalTextEl = document.getElementById('total_text');
    totalTextEl.classList.remove('invisible');
    const maxTextEl = document.getElementById('max_text');
    maxTextEl.classList.remove('invisible');
    const maxPriceEl = document.getElementById('max_price');
    maxPriceEl.textContent = taskList.max_price(task);
    const maxNameEl = document.getElementById('max_name');
    maxNameEl.textContent = taskList.max_name(task);
    //  создали элемент
    const priceEl = document.createElement('span');
    // подставили
    liEl.textContent = task.name;
    priceEl.textContent = task.price;
    // пока у элемента нет родителя, он не отображается
    liEl.className = 'list-group-item float-left';
    priceEl.className = 'badge badge-success';
    const removeEl = document.createElement('button');
    removeEl.className = 'btn btn-outline-danger btn-sm float-right';
    removeEl.textContent = 'Удалить';


    removeEl.addEventListener('click', function (evt) {
        liEl.remove(); // не везде работает
        totalpriceEl.textContent = taskList.remove(task);
        maxPriceEl.textContent = taskList.update_max_price(task);
        maxNameEl.textContent = taskList.update_max_name(task);

    });

    // Самая трудоемкая часть синхронизация между DOM и памятью

    liEl.appendChild(priceEl);
    liEl.appendChild(removeEl); //  в скобки берется тот, кого берут
    listEl.appendChild(liEl); // метод взять ребенка


});