import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from '../shared/models/items.model';
import { Stores } from '../shared/models/stores.model';
import { Itenary } from '../shared/models/itenary.model';

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

    getAllItems(): Observable<Items[]> {
        const url = 'items';
        return this.getData(url);
    }

    getItemById(itemId: number): Observable<Items> {
        const url = 'items/' + itemId;
        return this.getData(url);
    }

    addItem(item: Items): Observable<number> {
        const url = 'items';
        return this.postData(url, item);
    }

    updateItem(item: Items): Observable<number> {
        const url = 'items';
        return this.putData(url, item);
    }

    getAllStores(): Observable<Stores[]> {
        const url = 'stores';
        return this.getData(url);
    }

    addStore(store: Stores): Observable<number> {
        const url = 'stores';
        return this.postData(url, store);
    }

    updateStore(store: Stores): Observable<number> {
        const url = 'stores';
        return this.putData(url, store);
    }

    getItemItenary(itemId: number): Observable<Itenary[]> {
        const url = 'itenary/' + itemId;
        return this.getData(url);
    }

    getData<T>(apiUrl: string): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.get<T>(url);
    }

    postData<T>(apiUrl: string, data: any): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.put<T>(url, data);
    }

    putData<T>(apiUrl: string, data: any): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.put<T>(url, data);
    }
}
