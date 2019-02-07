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

    sum(item){
        this.storage.sum(item);
        return this.storage.priceall;
    }

    remove(item) {
       this.storage.remove(item);
    }

    maxPrice() {
       this.storage.maxPrice();

    }


    removeAll(){
        this.storage.removeAll();
    }

}
