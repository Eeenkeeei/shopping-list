export class Task {
    constructor(name, price) {
        this.name = name;
        this.price = price;

    }
}

export class TaskList {
    constructor() {
        this.items = [];
        this.priceall = 0;
        this.max_item_price = 0;
        this.max_item_name = '';
    }
    add(item) {
        this.items.push(item);
        let totalPrice = 0;
        for (const item of this.items) {
            totalPrice += item.price;
        }
        this.priceall = totalPrice;
        return this.priceall;
    }

    // todo: одинаковая максимальная сумма товаров
    // add_more_max(item){
    //     const index = this.items.indexOf(item);
    //     for (const item of this.items) {
    //         if (item.price === this.max_item_price){
    //
    //         }
    //     }
    // }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        this.max_item_price = this.maxPrice();
        this.max_item_name = this.maxName();
        this.priceall -= item.price;
        return this.priceall;
    }

    maxPrice() {
        let result = 0;
        for (const item of this.items) {
            if (item.price > result) {
                result = item.price;
            }
        }
        this.max_item_price = result;
        return this.max_item_price;
    }

    maxName() {
        for (const item of this.items) {
            if (this.max_item_price === item.price) {
                this.max_item_name = item.name;
            }
        }
        return this.max_item_name;
    }

}
