import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../shared/models/item.model';
import { Store } from '../shared/models/store.model';
import { Itenary } from '../shared/models/itenary.model';
import { StoreDetails } from '../shared/models/store-details.model';
import { StoreItem } from '../shared/models/store-item.model';
import { Payment } from '../shared/models/payment.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiBaseUrl = '';

    constructor(private httpClient: HttpClient) {
    }

    loadAssetConfigurations(configPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(configPath).toPromise().then((response: any) => {
                this.apiBaseUrl = response.apiBaseUrl;
                return resolve(this.apiBaseUrl);
            }).then(() => resolve())
                .catch(() => reject());
        });
    }

    getAllItems(): Observable<Item[]> {
        const url = 'items';
        return this.getData(url);
    }

    getItemById(itemId: number): Observable<Item> {
        const url = 'items/' + itemId;
        return this.getData(url);
    }

    addItem(item: Item): Observable<number> {
        const url = 'items';
        return this.postData(url, item);
    }

    updateItem(item: Item): Observable<number> {
        const url = 'items';
        return this.putData(url, item);
    }

    getAllStores(): Observable<Store[]> {
        const url = 'stores';
        return this.getData(url);
    }

    getStoreById(storeId: number): Observable<Store> {
        const url = 'stores/' + storeId;
        return this.getData(url);
    }

    addStore(store: Store): Observable<number> {
        const url = 'stores';
        return this.postData(url, store);
    }

    updateStore(store: Store): Observable<number> {
        const url = 'stores';
        return this.putData(url, store);
    }

    getItemItenary(itemId: number): Observable<Itenary[]> {
        const url = 'itenary/' + itemId;
        return this.getData(url);
    }

    getAllItemsBoughtByStore(storeId: number): Observable<StoreDetails> {
        const url = 'store/items/' + storeId;
        return this.getData(url);
    }

    addItenary(itenary: Itenary): Observable<number> {
        const url = 'itenary';
        return this.postData(url, itenary);
    }

    updateItenary(itenary: Itenary): Observable<number> {
        const url = 'itenary';
        return this.putData(url, itenary);
    }

    addStoreItem(storeItem: StoreItem): Observable<number> {
        const url = 'store/items';
        return this.postData(url, storeItem);
    }

    updateStoreItem(storeItem: StoreItem): Observable<number> {
        const url = 'store/items';
        return this.putData(url, storeItem);
    }

    getAllPaymentsDoneByStore(storeId: number): Observable<Payment[]> {
        const url = 'payments/' + storeId;
        return this.getData(url);
    }

    getLeftAmountToBePaidByStore(storeId: number): Observable<number> {
        const url = 'store/' + storeId + '/leftpayment';
        return this.getData(url);
    }

    addPayment(payment: Payment): Observable<number> {
        const url = 'payments';
        return this.postData(url, payment);
    }

    updatePayment(payment: Payment): Observable<number> {
        const url = 'payments';
        return this.putData(url, payment);
    }

    getData<T>(apiUrl: string): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.get<T>(url);
    }

    postData<T>(apiUrl: string, data: any): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.post<T>(url, data);
    }

    putData<T>(apiUrl: string, data: any): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.put<T>(url, data);
    }
}
