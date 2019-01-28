import {PurchaseList, Purchase} from './lib.js';

const formEl = document.querySelector('#task-form'); // через # id
const nameEl = document.querySelector('#task-name');
const addPriceEl = document.querySelector('#task-price');
const listEl = document.querySelector('#task-list');

const totalPriceEl = document.getElementById('total_price');
const purchaseList = new PurchaseList();


formEl.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = nameEl.value;
    const price = parseInt(addPriceEl.value);
    const liEl = document.createElement('li');
    const errorEl = document.getElementById('error-box');

    addPriceEl.value = addPriceEl.value.trim();
    if (isNaN(addPriceEl.value)) {
        errorEl.classList.remove('invisible');
        return;
    }
    if (addPriceEl.value < 0) {
        errorEl.classList.remove('invisible');
        return;
    }
    if (addPriceEl.value === '') {
        errorEl.classList.remove('invisible');
        return;
    }
    if (addPriceEl.value === '0') {
        errorEl.classList.remove('invisible');
        return;
    }

    const product = new Purchase(name, price);
    totalPriceEl.textContent = purchaseList.add(product);
    errorEl.classList.add('invisible');
    nameEl.value = '';
    addPriceEl.value = '';

    const helloTextEl = document.getElementById('hello-text');
    helloTextEl.classList.add('invisible');
    const totalTextEl = document.getElementById('total_text');
    totalTextEl.classList.remove('invisible');
    const maxTextEl = document.getElementById('max_text');
    maxTextEl.classList.remove('invisible');
    const maxPriceEl = document.getElementById('max_price');
    maxPriceEl.textContent = purchaseList.maxPrice();
    const maxNameEl = document.getElementById('max_name');
    maxNameEl.textContent = purchaseList.maxName();
    //  создали элемент
    const priceEl = document.createElement('span');
    // подставили
    liEl.textContent = product.name;
    priceEl.textContent = product.price;
    // пока у элемента нет родителя, он не отображается
    liEl.className = 'list-group-item float-left';
    priceEl.className = 'badge badge-success';
    const removeEl = document.createElement('button');
    removeEl.className = 'btn btn-outline-danger btn-sm float-right';
    removeEl.textContent = 'Удалить';

    removeEl.addEventListener('click', (evt) => {
        liEl.remove(); // не везде работает
        totalPriceEl.textContent = purchaseList.remove(product);
        maxPriceEl.textContent = purchaseList.maxPrice();
        maxNameEl.textContent = purchaseList.maxName();
        setInvisible();

    });

    function setInvisible () {
        if (purchaseList.priceall === 0){
            maxTextEl.classList.add('invisible');
            maxPriceEl.classList.add('invisible');
            maxNameEl.classList.add('invisible');
            totalPriceEl.classList.add('invisible');
            totalTextEl.classList.add('invisible');
            helloTextEl.classList.remove('invisible');
            errorEl.classList.add('invisible');
            nameEl.value = '';
            addPriceEl.value = '';
        }
    }

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