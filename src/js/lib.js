export class Task {
    constructor(name, price) {
        this.name = name;
        this.price = price;

    }
}

export class TaskList { //  несмотря на то, что будет только один
    constructor() {
        this.items = [];
        this.priceall = 0;
    }

    add(item) {
        this.items.push(item); // добавление в конец
        let totalPrice = 0;
        for (const item of this.items) {
            totalPrice += item.price;
        }
        this.priceall = totalPrice;
        return this.priceall;
    }

    remove(item) {
        const index = this.items.indexOf();
        if (index !== -1) {
            this.items.splice(index, 1);

        }
        console.log(this.priceall);
        return this.priceall-item.price;
    }

}