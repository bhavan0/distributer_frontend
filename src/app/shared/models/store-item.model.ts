import { Item } from './item.model';
import { Store } from './store.model';

export class StoreItem {
    id: number;
    storeId: number;
    itemId: number;
    date: string;
    boughtCount: number;
    store: Store;
    item: Item;

    dateObject: any;

    constructor() {
        this.id = 0;
        this.storeId = 0;
        this.itemId = 0;
        this.dateObject = new Date();
        this.boughtCount = 0;
    }
}
