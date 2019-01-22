export class Task {
    constructor(name, price) {
        this.name = name;
        this.price = price;

    }
}

export class TaskList { // несмотря на то, что будет только один
    constructor() {
        this.items = [];
        this.priceall = 0;
        this.max_item_price = 0 ;
        this.max_item_price_index = 0;
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
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);

        }
        console.log(this.priceall);
        this.priceall -= item.price;
        return this.priceall;
    }

    max_price(item) {
        const index = this.items.indexOf(item);
        for (const item of this.items) {
            if (item.price>this.max_item_price)
                this.max_item_price = item.price;
        }

        return this.max_item_price;

    }
    max_price_name(item){
        const index = this.items.indexOf(item);
        for (const item of this.items) {

        }
    }

}