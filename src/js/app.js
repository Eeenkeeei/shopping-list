import {TaskList, Task} from './lib.js';

const formEl = document.querySelector('#task-form'); // через # id
const nameEl = document.querySelector('#task-name');
const addpriceEl = document.querySelector('#task-price');
const listEl = document.querySelector('#task-list');
const priceEl = document.querySelector('#price-list');
const totalpriceEl = document.getElementById('total_price');
const taskList = new TaskList();


formEl.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = nameEl.value;
    const price = parseInt(addpriceEl.value);
    const liEl = document.createElement('li');
    const errorEl = document.getElementById('error-box');
    addpriceEl.value = addpriceEl.value.trim();
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

    const helloTextEl = document.getElementById('hello-text');
    helloTextEl.classList.add('invisible');
    const totalTextEl = document.getElementById('total_text');
    totalTextEl.classList.remove('invisible');
    const maxTextEl = document.getElementById('max_text');
    maxTextEl.classList.remove('invisible');
    const maxPriceEl = document.getElementById('max_price');
    maxPriceEl.textContent = taskList.max_price();
    const maxNameEl = document.getElementById('max_name');
    maxNameEl.textContent = taskList.max_name();
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

    // rebuild(maxTextEl);

    removeEl.addEventListener('click', (evt) => {
        liEl.remove(); // не везде работает
        totalpriceEl.textContent = taskList.remove(task);
        maxPriceEl.textContent = taskList.max_price();
        maxNameEl.textContent = taskList.max_name();
        if (taskList.priceall === 0){
            maxTextEl.classList.add('invisible');
            maxPriceEl.classList.add('invisible');
            maxNameEl.classList.add('invisible');
            totalpriceEl.classList.add('invisible');
            totalTextEl.classList.add('invisible');
            helloTextEl.classList.remove('invisible');
        }

    });
    // Самая трудоемкая часть синхронизация между DOM и памятью
    liEl.appendChild(priceEl);
    liEl.appendChild(removeEl); //  в скобки берется тот, кого берут
    listEl.appendChild(liEl); // метод взять ребенка

    // todo:

    function rebuild(container) {
        container.innerHTML = ''; // вырезать всех детей

            const maxTextEl = document.createElement('badge');
            maxTextEl.className = 'badge badge-warning ';

            maxTextEl.innerHTML = `
       <h3><span class="badge badge-secondary " id="max_name"></span></h3>
        `;
            container.appendChild(maxTextEl);

    }
});