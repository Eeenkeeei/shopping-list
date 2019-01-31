export class PurchaseLocalStorage {
    constructor() {
        const items = this.items = JSON.parse(localStorage.getItem('products'));
        if (items !== null) {
            this.items = items;
        } else {
            this.items = [];
        }

        this.priceall = 0;
        this.max_item_price = 0;
        this.max_item_name = '';
        // todo: обработка ошибок
    }

    add(item) {
        this.items.push(item);
        this.save();
    }

    sum(item){
        let totalPrice = 0;
        for (const item of this.items) {
            totalPrice += item.price;
            this.save();
        }
        this.priceall = totalPrice;
        console.log(this.priceall);
        return this.priceall;
    }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
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
                this.save();
            }
        }
        this.max_item_price = result;
        return this.max_item_price;

    }

    maxName() {
        for (const item of this.items) {
            if (this.max_item_price === item.price) {
                this.max_item_name = item.name;
                this.save();
            }
        }
        return this.max_item_name;
    }
    save() {
        localStorage.setItem('products', JSON.stringify(this.items)) // stringify - преобразование объекта в строку
    }
}

