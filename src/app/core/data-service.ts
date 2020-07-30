import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from '../shared/models/items.model';

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

    getData<T>(apiUrl: string): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.get<T>(url);
    }
}
