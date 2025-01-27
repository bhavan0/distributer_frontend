import { Item } from './item.model';

export class Itenary {
    id: number;
    itemId: number;
    date: string;
    boughtCount: number;
    soldCount: number;
    item: Item;

    dateObject: any;

    constructor() {
        this.id = 0;
        this.itemId = 0;
        this.date = '';
        this.boughtCount = 0;
        this.soldCount = 0;
        this.dateObject = new Date();
    }
}
