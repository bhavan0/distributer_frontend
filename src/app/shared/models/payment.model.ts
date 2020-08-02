import { Store } from './store.model';

export class Payment {
    id: number;
    storeId: number;
    date: string;
    amount: number;
    store: Store;

    dateObject: any;

    constructor() {
        this.id = 0;
        this.storeId = 0;
        this.date = '';
        this.amount = 0;
    }
}
