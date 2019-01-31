import {PurchaseList, Purchase} from './lib.js';
import {PurchaseLocalStorage} from "./storage.js";

const formEl = document.querySelector('#task-form');
const nameEl = document.querySelector('#task-name');
const listEl = document.querySelector('#task-list');
const priceEl = document.querySelector('#task-price');

const purchaseList = new PurchaseList(new PurchaseLocalStorage());

rebuildTree(listEl, purchaseList);

nameEl.addEventListener('input', (evt) => {
    evt.preventDefault();
    if (nameEl.value === '') {
        nameEl.classList.add('error')
    } else {
        nameEl.classList.remove('error');
    }
});

const contextMenuListener = (evt) => {
    evt.preventDefault();
};

nameEl.addEventListener('contextmenu', contextMenuListener);
nameEl.removeEventListener('contextmenu', contextMenuListener);


formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const name = nameEl.value;
    const price = parseInt(priceEl.value);
    const errorEl = document.getElementById('error-box');
    // todo: добавить систему флага для обновления состояния
    priceEl.value = priceEl.value.trim();
    if (isNaN(priceEl.value)) {
        errorEl.classList.remove('invisible');
        return;
    }
    if (priceEl.value < 0) {
        errorEl.classList.remove('invisible');
        return;
    }
    if (priceEl.value === '') {
        errorEl.classList.remove('invisible');
        return;
    }
    if (priceEl.value === '0') {
        errorEl.classList.remove('invisible');
        return;
    }

    const product = new Purchase(name, price);
    purchaseList.add(product);

    nameEl.value = '';
    priceEl.value = '';
    rebuildTree(listEl, purchaseList);
});

function rebuildTree(container, list) {
    container.innerHTML = '';
    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item col-10';

        liEl.innerHTML = `
            <span data-id="text" class="badge badge-info"><h6>Наименование: ${item.name}</h6></span>
            <span data-id="text1" class="badge badge-success"><h6>Стоимость: ${item.price} р.</h6> </span>
            <button data-id="remove" class="btn btn-danger btn-sm float-right">Удалить</button>
        `;


        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            purchaseList.remove(item);
            rebuildTree(container, list);

        });

        container.appendChild(liEl);

    }
    let totalPrice = 0;
    let maxItemPrice = 0;
    let maxItemName = '';
    // todo: провести тесты на максимальном значении
    for (const item of list.items) {
        totalPrice = purchaseList.sum(item);
        maxItemPrice = purchaseList.maxPrice();
        maxItemName = purchaseList.storage.max_item_name;
    }

    const textBox = document.createElement('span');
    textBox.className = 'badge  col-10';
    textBox.innerHTML = `
            <p></p>
            <h3><span class="badge badge-secondary" data-id="total_text">Общая стоимость:</span></h3>
            <h3><span class="badge badge-success " data-id="total_price">${totalPrice}</span></h3>
            <h3><span class="badge badge-secondary" data-id="max_text">Самый дорогой товар: </span></h3>
            <h3><span class="badge badge-warning " data-id="max_name">${maxItemName}</span></h3>
            <h3><span class="badge badge-warning" data-id="max_price">${maxItemPrice}</span></h3>
    `;
    container.appendChild(textBox);

}

