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
    // TODO: валидация
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
            <span data-id="text">${item.name}</span>
            <span data-id="text">Стоимость: ${item.price} р. </span>
            <button data-id="remove" class="btn btn-danger btn-sm float-right">Удалить</button>
        `;


        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            purchaseList.remove(item);
            rebuildTree(container, list);

        });

        container.appendChild(liEl);

    }
    const item = list.items;
    const textBox = document.createElement('span');
    textBox.className = 'badge  col-10';
    let totalPrice = purchaseList.sum(item);
    textBox.innerHTML = `
            <p></p>
            <h3><span class="badge badge-secondary" data-id="total_text">Общая стоимость:</span></h3>
            <h3><span class="badge badge-success " data-id="total_price">${totalPrice}</span></h3>
            <h3><span class="badge badge-secondary" data-id="max_text">Самый дорогой товар: </span></h3>
            <h3><span class="badge badge-warning " data-id="max_name"></span></h3>
            <h3><span class="badge badge-warning" data-id="max_price"></span></h3>
    `;
    container.appendChild(textBox);

}

