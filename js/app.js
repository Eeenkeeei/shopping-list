import {PurchaseList, Purchase} from './lib.js';
import {PurchaseLocalStorage} from "./storage.js";

const formEl = document.querySelector('#task-form');
const nameEl = document.querySelector('#task-name');
const listEl = document.querySelector('#task-list');
const priceEl = document.querySelector('#task-price');

const purchaseList = new PurchaseList(new PurchaseLocalStorage());
rebuildTree(listEl, purchaseList);

const addButton = document.querySelector('#add-item');

formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const name = nameEl.value;
    const price = parseInt(priceEl.value);
    const taskNameEl = document.querySelector('#task-name');
    const taskPriceEl = document.querySelector('#task-price');


    priceEl.value = priceEl.value.trim();

    let ifErrorName = false;
    let ifError= false;

    if (nameEl.value === ''){
        ifError = true;
        ifErrorName = true;
        taskNameEl.classList.add('input-form-error') ;
        taskPriceEl.classList.remove('input-form-error') ;

    }

    if (isNaN(priceEl.value)) {
        ifError = true;
        taskPriceEl.classList.add('input-form-error') ;
        if (ifErrorName === false) {
            taskNameEl.classList.remove('input-form-error') ;
        }
    }

    if (priceEl.value < 0) {
        ifError = true;
        taskPriceEl.classList.add('input-form-error') ;
        if (ifErrorName === false) {
            taskNameEl.classList.remove('input-form-error') ;
        }
    }

    if (priceEl.value === '') {
        ifError = true;
        taskPriceEl.classList.add('input-form-error') ;
        if (ifErrorName === false) {
            taskNameEl.classList.remove('input-form-error') ;
        }
    }

    if (priceEl.value === '0') {
        ifError = true;
        taskPriceEl.classList.add('input-form-error') ;
        if (ifErrorName === false) {
            taskNameEl.classList.remove('input-form-error') ;
        }
    }

    if (ifError === true) {
        addButton.className = "btn btn-outline-danger mb-3";
        return;
    }


        addButton.className = "btn btn-outline-primary mb-3";
        taskNameEl.classList.remove('input-form-error') ;
        taskPriceEl.classList.remove('input-form-error') ;
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
    for (const item of list.items) {
        totalPrice = purchaseList.sum(item);

        // todo: переделать для стоимости и имени

        maxItemPrice = purchaseList.maxPrice();
        maxItemName = purchaseList.storage.max_item_name;
    }
    if (totalPrice != 0) {
        const textBox = document.createElement('span');
        textBox.className = 'badge col-10';
        textBox.innerHTML = `
            <p></p>
            <button data-id="removeAll" class="btn btn-danger btn-sm float-right">Удалить все</button>
            <h3><span class="badge badge-secondary" data-id="total_text" id="total_text">Общая стоимость:</span></h3>
            <h3><span class="badge badge-success " data-id="total_price">${totalPrice} p.</span></h3>
            <h3><span class="badge badge-secondary" data-id="max_text">Самый дорогой товар: </span></h3>
            <h3><span class="badge badge-warning " data-id="max_name">Наименование: ${maxItemName}</span></h3>
            <h3><span class="badge badge-warning" data-id="max_price">Стоимость: ${maxItemPrice} p.</span></h3>
    `;

        const removeAllEl = textBox.querySelector('[data-id=removeAll]');
        removeAllEl.addEventListener('click', (evt) =>{
            purchaseList.removeAll();
            rebuildTree(container, list);
        });
        container.appendChild(textBox);
    }
}

