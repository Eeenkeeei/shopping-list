export class Task {
    constructor(name){
        this.name = name;
        this.done = false; // сделано/нет
    }
}

export class TaskList { //  несмотря на то, что будет только один
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item); // добавление в конец
    }
    remove(){
    // todo:
    }
}