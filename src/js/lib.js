export class Purchase {
    constructor(name, price) {
        this.name = name;
        this.price = price;

    }
}

export class PurchaseList {
    constructor(storage) {
        this.storage = storage;
    }

    get items() {                       // getter
        return this.storage.items;
    }

    add(item) {
       this.storage.add(item);
    }

    remove(item) {
       this.storage.remove(item);
    }

    maxPrice() {
       this.storage.maxPrice();
    }

    maxName() {
        this.storage.maxName();
    }

}
