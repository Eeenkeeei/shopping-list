import {TaskList, Task} from './lib.js';

const formEl = document.querySelector('#task-form'); // через # id
const nameEl = document.querySelector('#task-name');
const listEl = document.querySelector('#task-list');

const taskList = new TaskList();

formEl.addEventListener('submit', function (evt) {
    // есть на некоторые события дефолтное поведение
    // click - переход
    // при отправке - страница перезагружается, форма отправляется на сервер
    evt.preventDefault(); // просим браузер не делать то, что он делает по умолчанию (обновление стр)

    const name = nameEl.value;
    // todo: валидация
    const task = new Task(name);
    taskList.add(task);

    nameEl.value = '';
    //  создали элемент
    const liEl = document.createElement('li');
    // подставили
    liEl.textContent = task.name;
    // пока у элемента нет родителя, он не отображается
    liEl.className = 'list-group-item';
    listEl.appendChild(liEl); // метод взять ребенка


});