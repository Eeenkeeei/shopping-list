export class PurchaseLocalStorage {
    constructor() {
        const items = this.items = JSON.parse(localStorage.getItem('products'));
        if (items !== null) {
            this.items = items;
        } else {
            this.items = [];
        }

        this.priceall = 0;
        this.maxItem = {
            price: 0,
            name: ''
        };
    }

    add(item) {
        this.items.push(item);
        this.save();
    }

    sum(item) {
        let totalPrice = 0;
        for (const item of this.items) {
            totalPrice += item.price;
            this.save();
        }
        this.priceall = totalPrice;

        return this.priceall;
    }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
        }
        this.maxItem.price= this.maxPrice();
        this.priceall -= item.price;
        return this.priceall;
    }

    removeAll() {
        this.items = [];
        this.save();
    }

    maxPrice() {
        let result = 0;
        for (const item of this.items) {
            if (item.price > result) {
                result = item.price;
                this.maxItem.name= item.name;
                this.save();
            }
        }
        this.maxItem.price = result;
    }

    save() {
        localStorage.setItem('products', JSON.stringify(this.items)) // stringify - преобразование объекта в строку
    }
}

