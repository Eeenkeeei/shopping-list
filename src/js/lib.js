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
        this.max_item_price = 0;
        this.max_item_name = '';
        this.deleted_item_name = '';
        this.deleted_item_price = 0;
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
            if (item.price === this.max_item_price){
                this.deleted_item_price=item.price;
                this.deleted_item_name=item.name;
                console.log('name deleted:',this.deleted_item_name); // возвращает верно
                console.log('price deleted:',this.deleted_item_price); // возвращает верно
                console.log('текущий макс', this.max_item_name, this.max_item_price); // возвращает верно
            }
        }
        this.priceall -= item.price;
        return this.priceall;
    }
    update_max_price(item){
        const index = this.items.indexOf(item);
        for (const item of this.items) {
            if (item.price > this.max_item_price)
                this.max_item_price = item.price;
        }
        console.log ('new max price:',this.max_item_price);
        return this.max_item_price;
    }
    update_max_name(item){
        const index = this.items.indexOf(item);
        for (const item of this.items) {
            if (item.price === this.max_item_price)
                this.max_item_name = item.name;
        }
        console.log('new max name',  this.max_item_name);
        return this.max_item_name;
    }
    max_price(item) {
        const index = this.items.indexOf(item);
        for (const item of this.items) {
            if (item.price > this.max_item_price)
                this.max_item_price = item.price;
        }
        return this.max_item_price;
    }

    max_name(item) {
        const index = this.items.indexOf(item);
        for (const item of this.items) {
            if (item.price === this.max_item_price)
                this.max_item_name = item.name;
        }
        return this.max_item_name;
    }

}
