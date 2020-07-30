import { Items } from './items.model';

export class Itenary {
    id: number;
    itemId: number;
    date: string;
    boughtCount: number;
    soldCount: number;
    item: Items;
}
